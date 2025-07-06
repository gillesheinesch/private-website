import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Basic health check - you can add more sophisticated checks here
        const healthData = {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || "development",
            version: process.env.npm_package_version || "1.0.0",
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            },
        };

        return NextResponse.json(healthData, { status: 200 });
    } catch (error) {
        console.error("Health check failed:", error);
        return NextResponse.json(
            {
                status: "error",
                timestamp: new Date().toISOString(),
                error: "Health check failed",
            },
            { status: 500 }
        );
    }
}
