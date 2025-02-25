import Card from "@/components/card";
import Link from "next/link"
const F1 = () => {

    return <>
        <Card>
            <h1>
                F1 page
            </h1>
            <Link href={'/routing-demo/f1/f2'}>Navigate F2 Page</Link>
        </Card>

    </>
}

export default F1;