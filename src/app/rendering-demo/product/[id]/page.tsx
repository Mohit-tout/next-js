// export const generateStaticParams = async () => {
//     return [{ id: 1 }, { id: 2 }, { id: 3 }]
// }
const Product = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    return <>
        <h1>Product Page</h1>
        <h1>Product Id :- {id}</h1>
    </>
}

export default Product;