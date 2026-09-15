/**
 * Minimal Strapi REST client for the Next.js frontend.
 *
 * Configure the base URL via NEXT_PUBLIC_STRAPI_URL (see .env.local.example).
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchAPI<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 }, // revalidate every 60s (ISR)
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

/** Resolve a Strapi media URL (e.g. "/uploads/foo.png") to an absolute URL. */
export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
