import Link from "next/link";

const Home = () => {

    return <>
        <h1>
            Welcome Home Page !!!
        </h1>
        <ul className="mt-5">
            <li className="mt-2">
                <Link href='/about'>About Us Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/blog'>Blog</Link>
            </li>
            <li className="mt-2">
                <Link href='/products'>Product Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/counter'>Counter Page</Link>
            </li>
            <li className="mt-2">
                <Link href='/articles/breaking-news-123?lang=en'>Read in English</Link>
            </li>
            <li className="mt-2">
                <Link href='/articles/breaking-news-123?lang=fr'>Read in French</Link>
            </li>
        </ul>
    </>

}
export default Home;