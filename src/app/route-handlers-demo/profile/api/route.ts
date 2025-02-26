import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
    // const requestHeader = new Headers(request.headers);
    // console.log(requestHeader.get('Authorization'));
    // const token = requestHeader.get('Authorization')

    // redirect("/")

    const headerList = headers();
    const token = (await headerList).get('Authorization');
    const theme = request.cookies.get('theme')

    const cookiesStore = await cookies();
    cookiesStore.set("page", "1");
    console.log('cookies store theme ---:', cookiesStore.get('theme'))


    if (!token) {
        return new Response('<h1>Please add token in header</h1>', {
            headers: {
                'Content-Type': 'text/html',
                'Set-Cookie': 'theme=dark'
            }
        })
    }
    return new Response('<h1>Profile Api data</h1>', {
        headers: {
            'Content-Type': 'text/html',
            'Set-Cookie': 'theme=dark'
        },
    })
}