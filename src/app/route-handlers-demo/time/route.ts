export const dynamic ='force-static'
export const GET = async () => {
    return new Response(JSON.stringify({ time: new Date().toLocaleTimeString() }), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}