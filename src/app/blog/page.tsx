import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/date";

export const metadata = {
  title: "Blog",
  description:
    "Articles and thoughts on web development, aviation, and more by Gilles Heinesch.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12">
        <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-cockpit-600 dark:text-cockpit-400">
          Articles and thoughts on web development, aviation, and more.
        </p>
      </header>

      <BlogListInner posts={posts} />
    </div>
  );
}

function BlogListInner({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  if (posts.length === 0) return <p className="text-cockpit-500">No posts yet.</p>;
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="transition-shadow hover:shadow-md dark:border-cockpit-800">
                  <CardContent className="p-6">
                    {post.thumbnail && (
                      <div className="relative mb-4 h-40 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    {post.category && (
                      <span className="text-xs font-medium uppercase tracking-wider text-cockpit-500 dark:text-cockpit-400">
                        {post.category}
                      </span>
                    )}
                    <h2 className="mt-1 font-mono text-xl font-semibold text-cockpit-900 dark:text-cockpit-100">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-cockpit-600 dark:text-cockpit-400">
                      {post.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                      <span className="flex items-center gap-1 text-cockpit-500 dark:text-cockpit-400">
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
                    <span className="mt-2 inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
      ))}
    </div>
  );
}
