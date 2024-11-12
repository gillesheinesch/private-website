import { Avatar, Box, Container, Grid2, Typography } from "@mui/material";

export default function About() {
    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Box
                sx={{
                    py: 1,
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    About me
                </Typography>

                <Grid2 container>
                    <Grid2 size={6}>
                        <Avatar
                            alt="Gilles Heinesch"
                            src="/gillesheinesch.jpg"
                            sx={{
                                width: 300,
                                height: 300,
                                mx: "auto",
                                mb: 2,
                            }}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Typography variant="body1" component="p">
                            <strong>Born:</strong> Luxembourg <br />
                            <strong>Work:</strong> Luxair S.A, Luxmebourg <br />
                            <strong>Hobbies:</strong> Running, Programming, ...
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}
