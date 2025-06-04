import { factories } from '@strapi/strapi';
import { Article } from '@/lib/news-scrapper';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
  async upsertByUrl(article: Article & { scraped?: boolean; locale: string }) {
    const base = await strapi.documents('api::article.article').findFirst({
      filters: { url: article.url },
      populate: ['localizations'],
    });

    const data = {
      title: article.title,
      date: article.date,
      image: article.image,
      content: article.content,
      category: article.category,
      scraped: article.scraped ?? true,
      url: article.url,
    };

    if (!base) {
      return strapi.documents('api::article.article').create({
        locale: article.locale,
        data,
      });
    }

    const versions = [base, ...(base.localizations ?? [])];
    const current = versions.find((v) => v.locale === article.locale);
    const documentId = base.documentId;

    const onlyBaseLocale = versions.length === 1;
    if (onlyBaseLocale && article.locale === base.locale) {
      return current ?? base;
    }

    if (current) {
      return strapi.documents('api::article.article').update({
        documentId,
        locale: article.locale,
        data,
      });
    }

    return strapi.documents('api::article.article').create({
      documentId,
      locale: article.locale,
      data,
    });
  },
}));
