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
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="mb-6 inline-block text-sm text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Back to blog
      </Link>
      <header className="mb-8">
        {post.category && (
          <span className="text-xs font-medium uppercase tracking-wider text-cockpit-500 dark:text-cockpit-400">
            {post.category}
          </span>
        )}
        <h1 className="mt-1 font-mono text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-cockpit-600 dark:text-cockpit-400">
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
      <div className="prose prose-cockpit dark:prose-invert prose-pre:bg-cockpit-900 prose-code:text-sky-400 max-w-none">
        <MDXContent content={post.content} />
      </div>
    </article>
  );
}
