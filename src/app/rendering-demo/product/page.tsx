import Link from "next/link";

const Product = () => {
    return <>
        <h1>Product Page</h1>
        <Link href={'/rendering-demo/product/1'}>Product 1</Link>
        <Link href={'/rendering-demo/product/2'}>Product 2</Link>
        <Link href={'/rendering-demo/product/3'}>Product 3</Link>
        <Link href={'/rendering-demo/product/4'}>Product 4</Link>

    </>
}

export default Product;