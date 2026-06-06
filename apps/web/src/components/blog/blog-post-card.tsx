import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Single blog post card for list view — thumbnail, title, description, date, reading time, tags */
export function BlogPostCard({ post, readingTime }: { post: BlogPost; readingTime?: number }) {
    const isLocalThumbnail = post.thumbnail?.startsWith("/");

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-xl"
        >
            <Card className="transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
                <CardContent className="p-4 sm:p-6">
                    {post.thumbnail && (
                        <div className="relative mb-4 h-32 w-full overflow-hidden rounded-lg sm:h-40">
                            {isLocalThumbnail ? (
                                <Image
                                    src={post.thumbnail}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 100vw, 672px"
                                    className="object-cover"
                                />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={post.thumbnail} alt="" className="h-full w-full object-cover" />
                            )}
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
                        {readingTime != null && (
                            <>
                                <span className="text-zinc-600">·</span>
                                <span className="flex items-center gap-1 text-zinc-500">
                                    <Clock className="h-3.5 w-3.5" />
                                    {readingTime} min read
                                </span>
                            </>
                        )}
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
    );
}
