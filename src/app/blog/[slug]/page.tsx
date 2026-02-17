import { PrevNextPosts } from "@/components/blog/prev-next-posts";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { SharePost } from "@/components/blog/share-post";
import { JsonLd } from "@/components/json-ld";
import { MDXContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { getAdjacentPosts, getAllSlugs, getPostBySlug, getReadingTimeMinutes } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";

/** Generate static params for all blog slugs */
export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

/** SEO metadata per post — title, OG image, canonical, keywords from tags */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags.length > 0 ? post.tags : undefined,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: post.title,
            description: post.description,
            url: canonicalUrl,
            images: post.thumbnail ? [{ url: post.thumbnail, alt: post.title }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const { prev, next } = getAdjacentPosts(slug);
    const readingTime = getReadingTimeMinutes(post.content);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heinesch.com";
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    /** Article schema for blog posts — improves search rich results */
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: "Gilles Heinesch",
        },
        image: post.thumbnail || `${BASE_URL}/images/gillesheinesch.png`,
        url: `${BASE_URL}/blog/${slug}`,
    };

    return (
        <>
            <ReadingProgressBar />
            <article
                id="blog-article"
                className="blog-article-noise relative container mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
            >
                <JsonLd data={articleSchema} />
                <Link
                    href="/blog"
                    className="mb-6 inline-flex min-h-[44px] items-center text-sm text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md pr-2"
                >
                    ← Back to blog
                </Link>
                <header className="mb-8">
                    {post.category && (
                        <span className="text-xs font-medium uppercase tracking-wider text-cyan-500/80">
                            {post.category}
                        </span>
                    )}
                    <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                        {post.title}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-zinc-400">
                        <span>{formatDate(post.date)}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {readingTime} min read
                        </span>
                    </div>
                    {post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    {/* Lead paragraph — description in larger, lighter text */}
                    {post.description && (
                        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                            {post.description}
                        </p>
                    )}
                </header>
                <div className="prose prose-invert prose-zinc prose-lg max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-pre:bg-zinc-900 prose-code:text-cyan-400 prose-a:text-cyan-400 prose-img:rounded-lg prose-p:leading-relaxed">
                    <MDXContent content={post.content} />
                </div>

                <div className="mt-10 border-t border-zinc-800 pt-8">
                    <SharePost url={canonicalUrl} title={post.title} description={post.description} />
                </div>

                <PrevNextPosts prev={prev} next={next} />
            </article>
        </>
    );
}
