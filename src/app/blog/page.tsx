import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Blog",
    description:
        "Articles and thoughts on web development, aviation, and more by Gilles Heinesch.",
    keywords: ["blog", "web development", "aviation", "Gilles Heinesch"],
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Blog | Gilles Heinesch",
        description:
            "Articles and thoughts on web development, aviation, and more by Gilles Heinesch.",
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="mb-8 sm:mb-12">
                <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Blog</h1>
                <p className="mt-2 text-zinc-400">Articles and thoughts on web development, aviation, and more.</p>
            </header>

            <BlogListInner posts={posts} />
        </div>
    );
}

function BlogListInner({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
    if (posts.length === 0) return <p className="text-zinc-500">No posts yet.</p>;
    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-xl"
                >
                    <Card className="transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
                        <CardContent className="p-4 sm:p-6">
                            {post.thumbnail && (
                                <div className="relative mb-4 h-32 overflow-hidden rounded-lg sm:h-40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={post.thumbnail} alt="" className="h-full w-full object-cover" />
                                </div>
                            )}
                            {post.category && (
                                <span className="text-xs font-medium uppercase tracking-wider text-cyan-500/80">
                                    {post.category}
                                </span>
                            )}
                            <h2 className="mt-1 font-mono text-xl font-semibold text-zinc-100">{post.title}</h2>
                            <p className="mt-2 text-sm text-zinc-400">{post.description}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                                <span className="flex items-center gap-1 text-zinc-500">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {formatDate(post.date)}
                                </span>
                                {post.tags.length > 0 && (
                                    <span className="flex gap-1">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </span>
                                )}
                            </div>
                            <span className="mt-2 inline-flex items-center gap-1 text-cyan-400">
                                Read more <ArrowRight className="h-4 w-4" />
                            </span>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
