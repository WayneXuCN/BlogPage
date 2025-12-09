import { defineMiddleware } from "astro:middleware";

/**
 * Manual i18n routing is enabled in astro.config.ts.
 * This no-op middleware keeps control with the existing file-based [lang] routes
 * while satisfying Astro's requirement for a middleware entrypoint.
 */
export const onRequest = defineMiddleware((_, next) => next());
