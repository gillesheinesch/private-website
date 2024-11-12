import { Box, Button, Card, CardActions, CardContent, Chip, Container, Grid2, Typography } from "@mui/material";
import Link from "next/link";

const projects = [
    {
        title: "FrëschKëscht S.à r.l.",
        description:
            "FrëschKëscht creates curated gift boxes filled with high-quality, 100% Luxembourgish products, offering eco-friendly, locally sourced treats perfect for any occasion.",
        labels: ["Odoo", "Business", "E-commerce"],
        website: "https://freschkescht.lu",
        github: "",
    },
    {
        title: "WeConnect S.à r.l.",
        description:
            "WeConnect is a platform that connects students seeking affordable housing with local hosts who have spare rooms, fostering meaningful intergenerational cohabitation and social support.",
        labels: ["Wordpress", "Business"],
        website: "https://weconnect.lu",
        github: "",
    },
    {
        title: "Dahindo a.s.b.l.",
        description:
            "Dahindo is a nonprofit organization dedicated to fighting hunger and improving access to education for underprivileged communities in Indonesia.",
        labels: ["Wordpress", "Non-profit"],
        website: "https://dahindo.com",
        github: "",
    },
];

export default function Projects() {
    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Projects
            </Typography>
            <Grid2 container spacing={4}>
                {projects.map((project, index) => (
                    <Grid2 size={6} key={index}>
                        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {project.labels.map((label, idx) => (
                                        <Chip key={idx} label={label} sx={{ mr: 1, mb: 1 }} />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions sx={{
                                mt: "auto",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}>
                                {project.website && (
                                    <Link href={project.website} passHref>
                                        <Button size="small" component="a" target="_blank" rel="noopener noreferrer">
                                            Website
                                        </Button>
                                    </Link>
                                )}
                                {project.github && (
                                    <Link href={project.github} passHref>
                                        <Button size="small" component="a" target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </Button>
                                    </Link>
                                )}
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}
