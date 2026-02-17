import type { MetadataRoute } from "next";

/** Base URL for sitemap reference */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";

/**
 * Generate robots.txt — allow all crawlers, reference sitemap
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
