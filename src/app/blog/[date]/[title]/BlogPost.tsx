"use client"
import { Box, Chip, Container, Typography } from "@mui/material";
import moment from "moment";
import ReactMarkdown from 'react-markdown';

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
                <img src={blog.thumbnail} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Box sx={{ mt: 4 }}>
                {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore ts(2769) */}
                <ReactMarkdown
                    components={{
                        h1: ({ ...props }) => <Typography variant="h4" component="h1" gutterBottom {...props} />,
                        h2: ({ ...props }) => <Typography variant="h5" component="h2" gutterBottom {...props} />,
                        h3: ({ ...props }) => <Typography variant="h6" component="h3" gutterBottom {...props} />,
                        p: ({ ...props }) => <Typography variant="body1" component="p" paragraph {...props} />,
                        a: ({ ...props }) => <Typography variant="body1" color="primary" component="a" {...props} />,
                        li: ({ ...props }) => <Typography variant="body1" component="li" {...props} />,
                    }}
                >
                    {blog.content}
                </ReactMarkdown>
                {/* eslint-enable @typescript-eslint/ban-ts-comment */}
            </Box>
        </Container>
    );
}