"use client";
import { Box, Chip, Container, Typography } from "@mui/material";
import moment from "moment";
import ReactMarkdown from 'react-markdown';

const MarkdownH1 = (props: any) => <Typography variant="h4" component="h1" gutterBottom {...props} />;
const MarkdownH2 = (props: any) => <Typography variant="h5" component="h2" gutterBottom {...props} />;
const MarkdownH3 = (props: any) => <Typography variant="h6" component="h3" gutterBottom {...props} />;
const MarkdownP = (props: any) => <Typography variant="body1" component="p" paragraph {...props} />;
const MarkdownA = (props: any) => <Typography variant="body1" color="primary" component="a" {...props} />;
const MarkdownLI = (props: any) => <Typography variant="body1" component="li" {...props} />;

// Define the type for the blog object
interface Blog {
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    date: string;
    tags: string[];
    content: string;
}

// Define the props type for the BlogPost component
interface BlogPostProps {
    blog: Blog;
}

export default function BlogPost({ blog }: BlogPostProps) {
    if (!blog) {
        return <div>Loading...</div>;
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