import Link from "next/link";

const Products = () => {

    return<>
    <h1>
       Welcome Products Page !!!
    </h1>
    <div className="mt-5">
        <h3>Product List !!!</h3>
        <ul className="mt-5">
            <li className="mt-2"><Link href={'/routing-demo/products/1'}>Product1</Link></li>
            <li className="mt-2"><Link href={'/routing-demo/products/2'}>Product2</Link></li>
            <li className="mt-2"><Link href={'/routing-demo/products/3'}>Product3</Link></li>
        </ul>
    </div>
    </>

}
export default Products;