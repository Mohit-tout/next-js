import { NextRequest } from "next/server";
import { comments } from "./data"
export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("search");
    const filteredComment = query ? comments?.filter((comment) => comment.text.includes(query)) : comments
    return Response.json(filteredComment)
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json(); // JSON body parse karein

        const newComment = {
            id: comments.length + 1,
            text: body.text // Ensure ki text sahi format me ho
        };

        comments.push(newComment);

        return new Response(JSON.stringify(newComment), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        });
    }
};
