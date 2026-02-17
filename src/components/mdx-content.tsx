import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

/** Custom markdown components for publication-style blog rendering */
const blogComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-cyan-400 underline hover:text-cyan-300"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  h2: ({ node, children, ...props }) => (
    <h2
      {...props}
      className="mt-12 mb-4 border-l-4 border-cyan-500 pl-4 font-mono text-xl font-bold text-zinc-100 sm:text-2xl"
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3
      {...props}
      className="mt-8 mb-3 font-mono text-lg font-semibold text-zinc-200 sm:text-xl"
    >
      {children}
    </h3>
  ),
  blockquote: ({ node, children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-cyan-500 bg-cyan-500/5 py-2 pl-4 pr-4 italic text-zinc-300"
    >
      {children}
    </blockquote>
  ),
  ul: ({ node, children, ...props }) => (
    <ul {...props} className="my-4 space-y-2 pl-6 [&>li]:marker:text-cyan-500/80">
      {children}
    </ul>
  ),
  ol: ({ node, children, ...props }) => (
    <ol {...props} className="my-4 list-decimal space-y-2 pl-6 [&>li]:marker:font-medium [&>li]:marker:text-cyan-500/80">
      {children}
    </ol>
  ),
  hr: () => (
    <hr
      className="my-8 border-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
      style={{ height: "1px" }}
      aria-hidden
    />
  ),
  strong: ({ node, children, ...props }) => (
    <strong {...props} className="font-semibold text-cyan-300/90">
      {children}
    </strong>
  ),
  img: ({ src, alt, ...props }) => (
    <span className="block my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-lg border border-zinc-700"
        {...props}
      />
      {alt && (
        <span className="mt-2 block text-center text-sm italic text-zinc-500">{alt}</span>
      )}
    </span>
  ),
};

/** Renders markdown with GFM, syntax highlighting, heading anchors, custom blog styling */
export function MDXContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSlug]}
      components={blogComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
