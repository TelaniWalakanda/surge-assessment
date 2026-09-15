import type { Core } from '@strapi/strapi';

/**
 * Single types the Next.js frontend reads without authentication.
 */
const PUBLIC_FIND_ACTIONS = [
  'api::home.home.find',
  'api::header.header.find',
  'api::footer.footer.find',
];

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
    await ensurePublicFindPermissions(strapi);
  },
};

/**
 * Ensures the "Public" role can read the configured single types, so the
 * Next.js frontend can fetch them without authentication. Idempotent.
 */
async function ensurePublicFindPermissions(strapi: Core.Strapi) {
  try {
    const publicRole: any = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const existing: any[] = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({
        where: { action: { $in: PUBLIC_FIND_ACTIONS } },
        populate: ['role'],
      });

    for (const action of PUBLIC_FIND_ACTIONS) {
      const alreadySet = existing.some(
        (permission: any) =>
          permission?.action === action && permission?.role?.id === publicRole.id,
      );

      if (!alreadySet) {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id } });
        strapi.log.info(`Granted public read access to ${action}.`);
      }
    }
  } catch (error) {
    strapi.log.warn('Could not grant public read access:', error);
  }
}


