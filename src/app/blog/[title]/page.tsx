import { Badge } from "@/components/ui/badge";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import path from "path";
import ReactMarkdown from "react-markdown";

// Custom markdown components
const MarkdownH1 = (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />;
const MarkdownH2 = (props: any) => <h2 className="text-2xl font-semibold mb-3" {...props} />;
const MarkdownH3 = (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />;
const MarkdownP = (props: any) => <p className="mb-4 leading-relaxed" {...props} />;
const MarkdownA = (props: any) => <a className="text-primary hover:underline" {...props} />;
const MarkdownLI = (props: any) => <li className="mb-2" {...props} />;

interface Blog {
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    date: string;
    tags: string[];
    content: string;
}

export async function generateMetadata() {
    const blogDirectory = path.join(process.cwd(), "blog");
    const filenames = fs.readdirSync(blogDirectory);

    let date = "";
    let title = "";

    await filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        date = data.date;
        title = encodeURIComponent(data.title);
    });
    const decodedTitle = decodeURIComponent(title);

    const blog: Blog | undefined = filenames
        .map((filename) => {
            const filePath = path.join(blogDirectory, filename);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContent);

            return {
                title: data.title,
                description: data.description,
                category: data.category,
                thumbnail: data.thumbnail,
                date: filename.split(".")[0],
                tags: data.tags,
                content: data.content,
            };
        })
        .find((blog) => blog.title === decodedTitle && blog.date === date);

    if (!blog) {
        return {
            title: "Blog not found",
        };
    }

    return {
        title: blog.title,
        description: blog.description,
    };
}

export default async function Page() {
    const blogDirectory = path.join(process.cwd(), "blog");
    const filenames = fs.readdirSync(blogDirectory);

    let date = "";
    let title = "";

    await filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        date = data.date;
        title = encodeURIComponent(data.title);
    });
    const decodedTitle = decodeURIComponent(title);

    const blog: Blog | undefined = filenames
        .map((filename) => {
            const filePath = path.join(blogDirectory, filename);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContent);

            return {
                title: data.title,
                description: data.description,
                category: data.category,
                thumbnail: data.thumbnail,
                date: filename.split(".")[0],
                tags: data.tags,
                content: content,
            };
        })
        .find((blog) => blog.title === decodedTitle && blog.date === date);

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-8 mt-8">
                <h1 className="text-2xl font-bold">Blog not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-8 max-w-4xl">
            <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{blog.category}</div>
                <div className="text-sm text-muted-foreground mb-4">{moment(blog.date).format("DD.MM.YYYY")}</div>
                <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="prose-content">
                    <ReactMarkdown
                        components={{
                            h1: MarkdownH1,
                            h2: MarkdownH2,
                            h3: MarkdownH3,
                            p: MarkdownP,
                            a: MarkdownA,
                            li: MarkdownLI,
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
