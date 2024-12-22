import { Box, Button, Card, CardActions, CardContent, Chip, Container, Grid2, Typography } from "@mui/material";

const projects = [
    {
        title: "FrëschKëscht S.à r.l.",
        description:
            "FrëschKëscht creates curated gift boxes filled with high-quality, 100% Luxembourgish products, offering eco-friendly, locally sourced treats perfect for any occasion.",
        labels: ["Odoo", "Business", "E-commerce"],
        position: "Co-Founder",
        website: "https://www.freschkescht.lu",
        github: "",
    },
    {
        title: "WeConnect S.à r.l.",
        description:
            "WeConnect is a platform that connects students seeking affordable housing with local hosts who have spare rooms, fostering meaningful intergenerational cohabitation and social support.",
        labels: ["Wordpress", "Business"],
        position: "Co-Founder",
        website: "https://www.weconnect.lu",
        github: "",
    },
    {
        title: "Dahindo a.s.b.l.",
        description:
            "Dahindo is a nonprofit organization dedicated to fighting hunger and improving access to education for underprivileged communities in Indonesia.",
        labels: ["Wordpress", "Non-profit"],
        position: "Co-Founder",
        website: "https://www.dahindo.com",
        github: "",
    },
    {
        title: "RosterX Web Application",
        description:
            "RosterX parses flight crew schedules into .ics files, allowing users to import their rosters into their preferred calendar application.",
        labels: ["React", "Tailwind CSS", "Node.js"],
        position: "Developer",
        website: "",
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
                {projects.map((project) => (
                    <Grid2 size={{xs: 12, sm: 6}} key={project.title}>
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    {project.position}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {project.labels.map((label) => (
                                        <Chip key={label} label={label} sx={{ mr: 1 }} />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href={project.website} target="_blank" rel="noopener noreferrer">
                                    Website
                                </Button>
                                {project.github && (
                                    <Button size="small" href={project.github} target="_blank" rel="noopener noreferrer">
                                        GitHub
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}