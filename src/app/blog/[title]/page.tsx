import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { Box, Chip, Container, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

const MarkdownH1 = (props: any) => <Typography variant="h4" component="h1" gutterBottom {...props} />;
const MarkdownH2 = (props: any) => <Typography variant="h5" component="h2" gutterBottom {...props} />;
const MarkdownH3 = (props: any) => <Typography variant="h6" component="h3" gutterBottom {...props} />;
const MarkdownP = (props: any) => <Typography variant="body1" component="p" paragraph {...props} />;
const MarkdownA = (props: any) => <Typography variant="body1" color="primary" component="a" {...props} />;
const MarkdownLI = (props: any) => <Typography variant="body1" component="li" {...props} />;

type Params = {
    date: string;
    title: string;
};

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
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    let date = "";
    let title = "";

    await filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        date = data.date
        title = encodeURIComponent(data.title)
    });
    const decodedTitle = decodeURIComponent(title);

    const blog: Blog | undefined = filenames
        .map((filename) => {
            const filePath = path.join(blogDirectory, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            return {
                title: data.title,
                description: data.description,
                category: data.category,
                thumbnail: data.thumbnail,
                date: filename.split('.')[0],
                tags: data.tags,
                content: data.content,
            };
        })
        .find(
            (blog) =>
                blog.title === decodedTitle &&
                blog.date === date
        );

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

export default async function Page() {
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    let date = "";
    let title = "";

    await filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        date = data.date
        title = encodeURIComponent(data.title)
    });
    const decodedTitle = decodeURIComponent(title);

    const blog: Blog | undefined = filenames
        .map((filename) => {
            const filePath = path.join(blogDirectory, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            return {
                title: data.title,
                description: data.description,
                category: data.category,
                thumbnail: data.thumbnail,
                date: filename.split('.')[0],
                tags: data.tags,
                content: content,
            };
        })
        .find(
            (blog) =>
                blog.title === decodedTitle &&
                blog.date === date
        );

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                {blog.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {moment(blog.date).format('DD.MM.YYYY')}
            </Typography>
            <Box sx={{ mt: 2 }}>
                {blog.tags.map((tag) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1 }} />
                ))}
            </Box>
            <Box sx={{ mt: 4 }}>
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
            </Box>
        </Container>
    );
}