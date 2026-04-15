import type { NextConfig } from "next";
import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z59ogw16",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const nextConfig: NextConfig = {
  async rewrites() {
    // Fetch blog base path from Sanity at build time
    let basePath = "blog";
    try {
      const settings = await sanityClient.fetch<{ blogBasePath?: string } | null>(
        `*[_type == "blogSettings"][0] { blogBasePath }`
      );
      if (settings?.blogBasePath && settings.blogBasePath !== "blog") {
        basePath = settings.blogBasePath;
      }
    } catch {
      // Fallback to "blog" if Sanity is unavailable
    }

    if (basePath !== "blog") {
      return [
        { source: `/${basePath}`, destination: "/blog" },
        { source: `/${basePath}/:path*`, destination: "/blog/:path*" },
      ];
    }

    return [];
  },

  async redirects() {
    try {
      const redirects = await sanityClient.fetch<
        Array<{
          source: string;
          destination: string;
          permanent: boolean;
          enabled: boolean;
        }>
      >(
        `*[_type == "redirect" && enabled != false] { source, destination, permanent }`
      );

      if (!redirects?.length) return [];

      return redirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: r.permanent !== false,
      }));
    } catch {
      return [];
    }
  },
};

export default nextConfig;
