import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";

/** Generate static params for all blog slugs */
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** SEO metadata per post */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post)
    return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
        <p className="mt-2 text-zinc-400">
          {formatDate(post.date)}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-pre:bg-zinc-900 prose-code:text-cyan-400 prose-a:text-cyan-400 prose-img:rounded-lg prose-p:leading-relaxed">
        <MDXContent content={post.content} />
      </div>
    </article>
  );
}
