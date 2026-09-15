import type { Core } from '@strapi/strapi';

const HOME_FIND_ACTION = 'api::home.home.find';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicHomeFindPermission(strapi);
  },
};

/**
 * Ensures the "Public" role can read the `home` single type, so the Next.js
 * frontend can fetch `GET /api/home` without authentication. Idempotent.
 */
async function ensurePublicHomeFindPermission(strapi: Core.Strapi) {
  try {
    const publicRole: any = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const existing: any[] = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({
        where: { action: HOME_FIND_ACTION },
        populate: ['role'],
      });

    const alreadySet = existing.some(
      (permission: any) => permission?.role?.id === publicRole.id,
    );

    if (!alreadySet) {
      await strapi
        .query('plugin::users-permissions.permission')
        .create({ data: { action: HOME_FIND_ACTION, role: publicRole.id } });
      strapi.log.info('Granted public read access to the Home single type.');
    }
  } catch (error) {
    strapi.log.warn('Could not grant public read access to the Home single type:', error);
  }
}


