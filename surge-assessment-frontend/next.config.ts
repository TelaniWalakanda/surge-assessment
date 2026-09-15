import type { NextConfig } from "next";

/**
 * Base URL of the Strapi CMS. Loaded from the environment so the frontend can
 * target a deployed CMS host without code changes (see .env.local.example).
 */
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function getStrapiHost(): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
} {
  try {
    const url = new URL(STRAPI_URL);
    return {
      protocol: url.protocol === "https:" ? "https" : "http",
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
    };
  } catch {
    return { protocol: "http", hostname: "localhost" };
  }
}

const { protocol, hostname, port } = getStrapiHost();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol,
        hostname,
        ...(port ? { port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
