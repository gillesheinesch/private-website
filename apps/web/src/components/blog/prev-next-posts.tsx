import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PrevNextPostsProps {
    prev: BlogPost | null;
    next: BlogPost | null;
}

/** Previous (newer) and next (older) post navigation */
export function PrevNextPosts({ prev, next }: PrevNextPostsProps) {
    if (!prev && !next) return null;

    return (
        <nav
            className="mt-12 flex flex-col gap-6 border-t border-zinc-800 pt-8 sm:flex-row sm:justify-between"
            aria-label="Adjacent posts"
        >
            {prev ? (
                <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-1 flex-col gap-1 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-4 transition-colors hover:border-cyan-500/30 hover:bg-zinc-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                    <span className="text-xs font-medium uppercase tracking-wider text-cyan-500/80">Previous</span>
                    <span className="font-mono font-semibold text-zinc-100 group-hover:text-cyan-400">
                        {prev.title}
                    </span>
                    {prev.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                            {prev.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-400">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Newer post
                    </span>
                </Link>
            ) : (
                <div className="flex-1" />
            )}
            {next ? (
                <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-1 flex-col gap-1 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-4 text-right transition-colors hover:border-cyan-500/30 hover:bg-zinc-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                    <span className="text-xs font-medium uppercase tracking-wider text-cyan-500/80">Next</span>
                    <span className="font-mono font-semibold text-zinc-100 group-hover:text-cyan-400">
                        {next.title}
                    </span>
                    {next.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap justify-end gap-1">
                            {next.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    <span className="mt-2 inline-flex items-center justify-end gap-1 text-sm text-cyan-400">
                        Older post
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </Link>
            ) : (
                <div className="flex-1" />
            )}
        </nav>
    );
}
