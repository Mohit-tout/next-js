import Link from "next/link";

const Home = () => {

    return <>
        <h1>
            Welcome Home Page !!!
        </h1>
        <ul className="mt-5">
            <li className="mt-2">
                <Link href='/routing-demo/about'>About Us Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/routing-demo/blog'>Blog</Link>
            </li>
            <li className="mt-2">
                <Link href='/routing-demo/products'>Product Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/routing-demo/counter'>Counter Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/routing-demo/articles/breaking-news-123?lang=en'>Read in English</Link>
            </li>
            <li className="mt-2">
                <Link href='/routing-demo/articles/breaking-news-123?lang=fr'>Read in French</Link>
            </li>
        </ul>
    </>

}
export default Home;