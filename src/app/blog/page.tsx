import { Grid2, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Typography } from "@mui/material";
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import moment from "moment"
import Link from "next/link";

export default function Blog() {
    const blogDirectory = path.join(process.cwd(), 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    const blogs = filenames.map((filename) => {
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
    });

    blogs.sort((a, b) => moment(b.date).diff(moment(a.date)));

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Blog
            </Typography>

            <Grid2 container spacing={4}>
                {blogs.map((blog) => (
                    <Grid2 size={
                        {
                            xs: 12,
                            sm: 6
                        }
                    } key={blog.title}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={blog.thumbnail}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    {blog.category}
                                </Typography>
                                <Link href={`/blog/${moment(blog.date).format('YYYY-MM-DD')}/${encodeURIComponent(blog.title)}`} passHref style={{ textDecoration: 'none', color: 'inherit'}}>
                                <Typography variant="h5" component="div">
                                        {blog.title}
                                </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {moment(blog.date).format('DD.MM.YYYY')}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {blog.tags.map((tag) => (
                                        <Chip key={tag} label={tag} sx={{ mr: 1 }} />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions>
                            <Link href={`/blog/${moment(blog.date).format('YYYY-MM-DD')}/${encodeURIComponent(blog.title)}`} passHref>
                                <Button size="small">
                                    Read More
                                </Button>
                            </Link>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}