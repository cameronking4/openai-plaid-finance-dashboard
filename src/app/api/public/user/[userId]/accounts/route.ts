import { accounts } from '@/app/actions/plaidService';
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params; // Extract userId from dynamic route

    // Validate API Key from Headers
    const apiKey = req.headers.get('x-api-key');
    const VALID_API_KEY = '1234567890'; // Replace with an env var in production
    if (apiKey !== VALID_API_KEY) {
        return NextResponse.json({
            message: "Unauthorized",
            status: 401,
        });
    }

    if (!userId) {
        return NextResponse.json({
            message: "Missing userId in request.",
            status: 400,
        });
    }

    try {
        const data = await accounts(userId);
        return NextResponse.json({
            message: "Authorized",
            data: data,
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({
            message: "Failed to fetch user data.",
            status: 500,
        });
    }
}