import { comment } from "postcss";
import { comments } from "../data";
import { error } from "console";

export const GET = async (_request: Request, { params }: {
    params: Promise<{ id: string }>
}) => {
    try {
        const { id } = await params;
        const comment = comments.find((comment) => comment.id === parseInt(id));
        return new Response(JSON.stringify(comment ? comment : []), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        })

    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error !!!' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        })
    }
}

export const DELETE = async (request: Request, { params }: {
    params: Promise<{ id: string }>
}) => {
    try {
        const { id } = await params;
        const index = comments.findIndex((comment) => comment.id === parseInt(id));
        if (index === -1) {
            return new Response(JSON.stringify({ error: 'Id is invalid !!!!' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            })
        }

        comments.splice(index, 1);
        return new Response(JSON.stringify({ message: 'Successfully comment deleted !!!' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })

    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

export const PATCH = async (request: Request, { params }: {
    params: Promise<{ id: string }>
}) => {
    try {
        const { id } = await params;
        const body = await request.json();
        const { text } = body;
        const index = comments.findIndex((comment) => comment.id === parseInt(id));
        if (index === -1) {
            return new Response(JSON.stringify({ error: 'Invalid Id !!!' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            })
        }

        comments[index].text = text;
        return new Response(JSON.stringify(comments[index]), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error !!!' }), {
            headers: { 'Content-Type': 'applicaiton/json' },
            status: 500
        })
    }

}