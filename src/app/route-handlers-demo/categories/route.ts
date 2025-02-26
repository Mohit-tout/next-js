export const GET = async () => {
    const categoriesData = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Books' },
        { id: 3, name: 'Clothing' },
        { id: 4, name: 'Home & Garden' },
    ]

    try {
        return new Response(JSON.stringify({ data: categoriesData }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error !!!' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        })
    }
}