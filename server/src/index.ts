// import type { Core } from '@strapi/strapi';

import { Core } from '@strapi/strapi';

import os from 'os';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {
    Object.values(os.networkInterfaces())
      .flat()
      .forEach((iface) => {
        if (iface?.family === 'IPv4' && !iface.internal) {
          console.log(`\nhttp://${iface.address}:1337`);
        }
      });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap() {},
};
