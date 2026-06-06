import fs from "fs";
import matter from "gray-matter";
import path from "path";

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
    const posts = slugs.map((s) => getPostBySlug(s)).filter((p): p is BlogPost => p !== null);
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Adjacent posts for prev/next navigation — sorted newest first */
export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
    const posts = getAllPosts();
    const idx = posts.findIndex((p) => p.slug === slug);
    if (idx === -1) return { prev: null, next: null };
    return {
        prev: idx > 0 ? posts[idx - 1]! : null,
        next: idx < posts.length - 1 ? posts[idx + 1]! : null,
    };
}

/** Posts grouped by year, then month — for archive-style list view */
export interface PostsByYearMonth {
    year: number;
    yearLabel: string;
    months: Array<{
        month: number;
        monthLabel: string;
        posts: BlogPost[];
    }>;
}

/** Get all posts grouped by year and month (newest first) */
export function getPostsGroupedByYearMonth(): PostsByYearMonth[] {
    const posts = getAllPosts();
    const byYear = new Map<number, Map<number, BlogPost[]>>();

    for (const post of posts) {
        const d = new Date(post.date);
        const year = d.getFullYear();
        const month = d.getMonth();
        if (!byYear.has(year)) byYear.set(year, new Map());
        const monthMap = byYear.get(year)!;
        if (!monthMap.has(month)) monthMap.set(month, []);
        monthMap.get(month)!.push(post);
    }

    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return Array.from(byYear.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([year, monthMap]) => ({
            year,
            yearLabel: String(year),
            months: Array.from(monthMap.entries())
                .sort((a, b) => b[0] - a[0])
                .map(([month, monthPosts]) => ({
                    month,
                    monthLabel: MONTHS[month]!,
                    posts: monthPosts,
                })),
        }));
}

/** Average reading speed (words per minute) */
const WORDS_PER_MINUTE = 200;

/** Estimate reading time in minutes from markdown content */
export function getReadingTimeMinutes(content: string): number {
    const plain = content.replace(/```[\s\S]*?```/g, "").replace(/[#*_~`\[\]()]/g, "");
    const words = plain.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
