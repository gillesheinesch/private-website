import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

/** Base URL for sitemap — use env or fallback to production */
const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";

/**
 * Generate sitemap.xml for SEO — static pages + dynamic blog posts
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ];

    return [...staticUrls, ...blogUrls];
}
