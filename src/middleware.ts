import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {

    // return NextResponse.redirect(new URL("/", request.url))
    // if (request.nextUrl.pathname === '/route-handlers-demo/profile')
    // return NextResponse.redirect(new URL("/", request.url))

    const response = NextResponse.next();
    const themePrefrence = request.cookies.get('theme');
    if (!themePrefrence)
        response.cookies.set('theme', 'light')

    return response;

}

// export const config = {
//     matcher: '/route-handlers-demo/profile'
// }