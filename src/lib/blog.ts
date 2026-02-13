import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** Frontmatter shape for blog posts (slug can override filename) */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category?: string;
  thumbnail?: string;
  date: string;
  tags: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "blog");

/** Get all blog slugs from filenames (e.g. 2024-11-16.md → 2024-11-16) */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .filter((f) => f !== "README.md")
    .map((f) => path.basename(f, path.extname(f)));
}

/** Get a single post by slug (matches filename or frontmatter slug) */
export function getPostBySlug(slug: string): BlogPost | null {
  const extensions = [".md", ".mdx"];
  for (const ext of extensions) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf8");
    const { data, content: body } = matter(content);
    return {
      slug,
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      category: data.category,
      thumbnail: data.thumbnail,
      date: data.date ?? slug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: body,
    };
  }
  return null;
}

/** Get all posts sorted by date (newest first) */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
