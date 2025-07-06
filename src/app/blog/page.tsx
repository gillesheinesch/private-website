import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import path from "path";

export default function Blog() {
    const blogDirectory = path.join(process.cwd(), "blog");
    const filenames = fs.readdirSync(blogDirectory);

    const blogs = filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
            title: data.title,
            description: data.description,
            category: data.category,
            thumbnail: data.thumbnail,
            date: data.date,
            tags: data.tags,
            content: content,
        };
    });

    blogs.sort((a, b) => moment(b.date).diff(moment(a.date)));

    return (
        <div className="container mx-auto px-4 py-8 mt-8">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <Card key={blog.title} className="overflow-hidden">
                        <div className="relative h-40 w-full">
                            <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
                        </div>
                        <CardHeader>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{blog.category}</div>
                            <CardTitle className="text-xl">
                                <Link href={`/blog/${encodeURIComponent(blog.title)}`} className="hover:underline">
                                    {blog.title}
                                </Link>
                            </CardTitle>
                            <CardDescription>{blog.description}</CardDescription>
                            <div className="text-sm text-muted-foreground">
                                {moment(blog.date).format("DD.MM.YYYY")}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/blog/${encodeURIComponent(blog.title)}`}>
                                <Button size="sm">Read More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
