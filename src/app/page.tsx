import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Import shadcn Button component (assuming it will be added later or exists)
// We'll use basic anchor tags for now
// import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col items-center text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Gilles Heinesch</h1>
            <p className="mb-8 max-w-prose">
                I am an aviation enthusiast and a passionate web developer. Explore my projects, learn more about me,
                and feel free to get in touch.
            </p>
            <div className="space-x-4">
                <Link href="/projects" passHref>
                    <Button variant="outline">Projects</Button>
                </Link>
                <Link href="/blog" passHref>
                    <Button variant="outline">Blog</Button>
                </Link>
                <Link href="/about" passHref>
                    <Button variant="outline">About me</Button>
                </Link>
            </div>
        </div>
    );
}
