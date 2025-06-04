/**
 * page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    query.populate = {
      // media: {
      //   populate: {
      //     file: true,
      //   },
      // },
      media: {
        fields: ['width', 'height', 'url', 'mime'],
      },
      buttons: {
        populate: {
          targetPage: {
            fields: ['locale'],
          },
        },
      },
    };
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
