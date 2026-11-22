import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getAllPosts, getPostsGroupedByYearMonth, getReadingTimeMinutes } from "@/lib/blog";
import type { Metadata } from "next";

const SITE_TITLE = "Gilles Heinesch";

/** Below this many posts a flat list reads better than year/month sections */
const GROUP_THRESHOLD = 6;

export const metadata: Metadata = {
    title: "Blog",
    description: "Notes on flying, building aviation software, and startups by Gilles Heinesch.",
    keywords: ["blog", "aviation", "pilot", "software", "startups", SITE_TITLE],
    alternates: { canonical: "/blog" },
    openGraph: {
        title: `Blog | ${SITE_TITLE}`,
        description: "Notes on flying, building aviation software, and startups by Gilles Heinesch.",
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    const groups = posts.length >= GROUP_THRESHOLD ? getPostsGroupedByYearMonth() : [];

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="mb-8 sm:mb-12">
                <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Blog</h1>
                <p className="mt-2 text-zinc-400">Notes on flying, building aviation software, and startups.</p>
            </header>

            {posts.length === 0 ? (
                <p className="text-zinc-500">No posts yet.</p>
            ) : groups.length === 0 ? (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} readingTime={getReadingTimeMinutes(post.content)} />
                    ))}
                </div>
            ) : (
                <div className="space-y-10">
                    {groups.map(({ year, yearLabel, months }) => (
                        <section key={year}>
                            <h2 className="mb-4 font-mono text-lg font-semibold text-zinc-300">{yearLabel}</h2>
                            <div className="space-y-8">
                                {months.map(({ month, monthLabel, posts }) => (
                                    <div key={`${year}-${month}`}>
                                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-500/80">
                                            {monthLabel}
                                        </h3>
                                        <div className="space-y-6">
                                            {posts.map((post) => (
                                                <BlogPostCard
                                                    key={post.slug}
                                                    post={post}
                                                    readingTime={getReadingTimeMinutes(post.content)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
