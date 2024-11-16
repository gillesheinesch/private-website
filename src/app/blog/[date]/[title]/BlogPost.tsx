"use client"
import { Box, Chip, Container, Typography } from "@mui/material";
import moment from "moment";
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ blog }) {
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
                <ReactMarkdown
                    components={{
                        h1: (props) => <Typography variant="h4" gutterBottom {...props} />,
                        h2: (props) => <Typography variant="h5" gutterBottom {...props} />,
                        h3: (props) => <Typography variant="h6" gutterBottom {...props} />,
                        p: (props) => <Typography variant="body1" paragraph {...props} />,
                        a: (props) => <Typography variant="body1" color="primary" {...props} />,
                        li: (props) => <Typography variant="body1" component="li" {...props} />,
                    }}
                >
                    {blog.content}
                </ReactMarkdown>
            </Box>
        </Container>
    );
}