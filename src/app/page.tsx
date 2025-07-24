import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <>
            <Container
                maxWidth="lg"
                sx={{
                    mt: 8,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        py: 8,
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h2" component="h1" gutterBottom>
                        Gilles Heinesch
                    </Typography>
                    <Typography variant="body1">
                        I am an aviation enthusiast and a passionate web developer. Explore my projects, learn more
                        about me, and feel free to get in touch.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Link href="/projects" passHref>
                            <Button variant="outlined" color="primary">
                                Projects
                            </Button>
                        </Link>
                        <Link href="/blog" passHref>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    ml: 2,
                                }}
                            >
                                Blog
                            </Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    ml: 2,
                                }}
                            >
                                About me
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
