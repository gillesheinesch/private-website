import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getPostsGroupedByYearMonth, getReadingTimeMinutes } from "@/lib/blog";
import type { Metadata } from "next";

const SITE_TITLE = "Gilles Heinesch";

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles and thoughts on web development, aviation, and more by Gilles Heinesch.",
    keywords: ["blog", "web development", "aviation", SITE_TITLE],
    alternates: { canonical: "/blog" },
    openGraph: {
        title: `Blog | ${SITE_TITLE}`,
        description: "Articles and thoughts on web development, aviation, and more by Gilles Heinesch.",
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function BlogPage() {
    const groups = getPostsGroupedByYearMonth();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="mb-8 sm:mb-12">
                <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Blog</h1>
                <p className="mt-2 text-zinc-400">Articles and thoughts on web development, aviation, and more.</p>
            </header>

            {groups.length === 0 ? (
                <p className="text-zinc-500">No posts yet.</p>
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
