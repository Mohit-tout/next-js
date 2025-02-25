import { Metadata } from "next";

type Props = {
    params: Promise<{ productId: string }>
}

export const generateMetadata=async ({params}:Props)=>{
    const id = (await params).productId
    return{
        title:`Product ${id}`,
        description:`Product ${id} meta data description`
    }
}

const ProductDetails = async ({ params }: Props) => {

    const productId = (await params).productId;

    return <>
        <h1>Welcom To Product Details Page</h1>
        <h2 >Product Id Is :- {productId}</h2>
    </>
}

export default ProductDetails;