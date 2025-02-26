import Link from "next/link";

const Home = () => {

    return <>
        <h1>
            Welcome Home Page !!!
        </h1>
        <ul className="mt-5">
            <li className="mt-2">
                <Link href='/routing-demo'>Routing Demo</Link>
            </li>
            <li className="mt-2">
                <Link href='/route-handlers-demo'>Route Handles Demo</Link>
            </li>
            <li className="mt-2">
                <Link href='/rendering-demo'>Rendering Demo</Link>
            </li>
        </ul>
    </>

}
export default Home;