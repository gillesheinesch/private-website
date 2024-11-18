import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import moment from "moment";
import BlogPost from './BlogPost';

export async function generateStaticParams() {
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    return filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
            date: moment(data.date).format('YYYY-MM-DD'),
            title: encodeURIComponent(data.title),
        };
    });
}

type Params = {
    date: string;
    title: string;
};

interface PageProps {
    params: Params;
    blog: {
        title: string;
        description: string;
        category: string;
        thumbnail: string;
        date: string;
        tags: string[];
        content: string;
    };
}

export async function generateMetadata({ params }: { params: Params }) {
    const { date, title } = params;
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    const blog = filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
            title: data.title,
            description: data.description,
            category: data.category,
            thumbnail: data.thumbnail,
            date: data.date,
            tags: data.tags,
        };
    }).find(blog => blog.title === decodeURIComponent(title) && moment(blog.date).format('YYYY-MM-DD') === date);

    if (!blog) {
        return {
            title: 'Blog not found',
        };
    }

    return {
        title: blog.title,
        description: blog.description,
    };
}

export default async function Page({ params }: { params: Params }) {
    const { date, title } = params;
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    const blog = filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
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
    }).find(blog => blog.title === decodeURIComponent(title) && moment(blog.date).format('YYYY-MM-DD') === date);

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return <BlogPost blog={blog} />;
}