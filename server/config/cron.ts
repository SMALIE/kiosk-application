import { Core } from '@strapi/strapi';
import { DateTime } from 'luxon';
import { Category, fetchNews } from '../src/lib/news-scrapper';
import { translateText } from '../src/lib/translator';

export default {
  '0 0 * * *': async ({ strapi }: { strapi: Core.Strapi }) => {
    const limit = DateTime.now().minus({ months: 1 });

    const metas = await fetchNews({
      monthsAgo: 1,
      categories: [Category.Events, Category.ForStudents, Category.Contests],
    });

    const localeRecords = await strapi.db.connection('i18n_locale').select('code');

    const allCodes = localeRecords.map((l) => l.code);

    const defaultLocale = strapi.config.get<string>('plugin::i18n.defaultLocale', 'pl');

    const svc = strapi.service('api::article.article');

    for (const art of metas) {
      await svc.upsertByUrl({
        ...art,
        scraped: true,
        locale: defaultLocale,
      });

      const translationJobs = allCodes
        .filter((code) => code !== defaultLocale)
        .map(async (code) => {
          try {
            const [titleResult, contentResult] = await Promise.all([
              translateText({ text: art.title, targetLang: code }),
              translateText({ text: art.content, targetLang: code }),
            ]);

            await svc.upsertByUrl({
              ...art,
              scraped: true,
              locale: code,
              title: titleResult,
              content: contentResult,
            });
          } catch (err) {
            console.error(err);
          }
        });

      await Promise.allSettled(translationJobs);
    }

    await strapi.db.query('api::article.article').deleteMany({
      where: {
        scraped: true,
        date: { $lt: limit.toISODate() },
      },
    });
  },
};
