import axios from 'axios';
import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';

export enum Category {
  Events = 5,
  ForStudents = 6,
  Achievements = 10,
  ForStaff = 30,
  Contests = 31,
  Archive = 32,
  Others = 33,
}

export interface Article {
  title: string;
  date: string;
  image: string;
  content: string;
  url: string;
  category: Category;
}

export const allCategories: Category[] = Object.values(Category).filter((v): v is Category => typeof v === 'number');

export async function fetchNews(
  opts: {
    monthsAgo?: number; // default 1
    categories?: Category[]; // default all
  } = {}
): Promise<Article[]> {
  const { monthsAgo = 1, categories = allCategories } = opts;

  const limit = DateTime.now().minus({ months: monthsAgo });

  const metas = (await Promise.all(categories.map((c) => collectMetas(c, limit)))).flat();
  const articles = await Promise.all(metas.map(scrapeArticle));

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

interface Meta {
  url: string;
  date: DateTime;
  title: string;
  excerpt: string;
  image: string;
  category: Category;
}

// News scraping system - Originally designed for University of Silesia website structure
// Demonstrates custom scraping logic for institutional news feeds
const BASE = 'https://example-institution.edu/news';
const $load = async (url: string) => cheerio.load((await axios.get<string>(url)).data);

const idFor = (c: Category) => `newsCategory${c}`;

const isoDateFrom = (time: cheerio.Cheerio<any>): DateTime => {
  const txt = time.text().trim();
  const text = txt.replace(/\s+/g, '');
  const byTxt = DateTime.fromISO(text);
  if (byTxt.isValid) return byTxt;

  const byAttr = DateTime.fromISO(time.attr('datetime') ?? '');
  return byAttr.isValid ? byAttr : DateTime.invalid('invalid');
};

const normalize = (s: string) =>
  s
    .replace(/&nbsp;|\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const fallbackTitle = (raw: string, max = 90): string => {
  const txt = normalize(raw);
  if (txt.length <= max) return txt;

  const slice = txt.slice(0, max);
  const chars = ['.', '!', '?'];
  const indexes = chars.map((c) => slice.lastIndexOf(c)).filter((i) => i !== -1);
  const idx = indexes.length > 0 ? Math.min(...indexes) : -1;

  if (idx >= 30) return slice.slice(0, idx + 1).trim();

  return slice.trim() + '…';
};

const collectMetas = async (cat: Category, limit: DateTime): Promise<Meta[]> => {
  const metas: Meta[] = [];
  const seen = new Set<string>();
  const queue = [`${BASE}#${idFor(cat)}`];

  while (queue.length) {
    const url = queue.shift()!;
    const $ = await $load(url);
    const id = idFor(cat);
    const cards = $(`#${id} .card-news`);

    cards.each((_, el) => {
      const card = $(el);
      const date = isoDateFrom(card.find('time'));
      if (!date.isValid || date < limit) return;

      const link = card.find('.card-title a').attr('href') ?? '';
      if (!link || seen.has(link)) return;
      seen.add(link);

      metas.push({
        url: link,
        date,
        title: normalize(card.find('.card-title a').text()),
        excerpt: normalize(card.find('.card-text').text()),
        image: (card.find('img').attr('src') ?? '').trim(),
        category: cat,
      });
    });

    const lastCard = cards.last();
    if (lastCard.length && isoDateFrom(lastCard.find('time')) < limit) continue;

    $('.pagination a.page-link[href]')
      .map((_, a) => new URL($(a).attr('href')!, BASE).href)
      .get()
      .filter((h) => h.includes(`#${id}`) && !queue.includes(h))
      .forEach((h) => queue.push(h));
  }

  return metas;
};

const scrapeArticle = async (m: Meta): Promise<Article> => {
  try {
    const $ = await $load(m.url);
    const card = $('.card');

    const h2 = normalize(card.find('h2').first().text());
    const paras = card
      .find('p')
      .map((_, p) => normalize($(p).text()))
      .get()
      .filter(Boolean);

    const hasH2 = Boolean(h2);
    const title = hasH2 ? h2 : fallbackTitle(paras[0] || m.title);

    const content = (hasH2 ? paras : paras.slice(1)).join('\n\n') || m.excerpt;

    return {
      title,
      date: m.date.toISODate(),
      image: (card.find('img').first().attr('src') ?? m.image).trim(),
      content,
      url: m.url,
      category: m.category,
    };
  } catch {
    return {
      title: fallbackTitle(m.title || m.excerpt),
      date: m.date.toISODate(),
      image: m.image,
      content: m.excerpt,
      url: m.url,
      category: m.category,
    };
  }
};
