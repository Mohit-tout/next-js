import Card from "@/components/card";
import Link from "next/link";

const F2 = () => {

    return <>
       <Card>
            <h1>
                F2 page
            </h1>
            <Link href={'/f1'}>Navigate F1 Page</Link>
        </Card>
    </>
}

export default F2;