"use client";

import { Facebook, Link2, Linkedin, Twitter } from "lucide-react";

interface SharePostProps {
    /** Full absolute URL of the post (e.g. https://heinesch.com/blog/slug) */
    url: string;
    title: string;
    description?: string;
}

function ShareLink({
    href,
    label,
    icon: Icon,
}: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
            <Icon className="h-4 w-4" />
        </a>
    );
}

/** Share buttons for Twitter, LinkedIn, Facebook, and copy link */
export function SharePost({ url, title, description }: SharePostProps) {
    const fullUrl = url.startsWith("http") ? url : `https://heinesch.com${url}`;
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent(description ? `${title} — ${description}` : title);

    const twitterHref = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            // Optional: toast or brief feedback — keep minimal for now
        } catch {
            /* ignore */
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-zinc-500">Share this post</span>
            <div className="flex items-center gap-2">
                <ShareLink href={twitterHref} label="Share on X" icon={Twitter} />
                <ShareLink href={linkedInHref} label="Share on LinkedIn" icon={Linkedin} />
                <ShareLink href={facebookHref} label="Share on Facebook" icon={Facebook} />
                <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                    <Link2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
