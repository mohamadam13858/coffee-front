import { NextRequest, NextResponse } from "next/server";




const protectedRoutes = [
    "/",
    "/menu",
    "/orders",
    "/profile",
    "/dashboard",
]


export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isProtectedRoute = protectedRoutes.some((route) => {
        if (route === "/") {
            return pathname === "/"
        }

        return pathname === route || pathname.startsWith(`${route}/`)

    })


    if (!isProtectedRoute) {
        return NextResponse.next()
    }

    const accessToken = request.cookies.get("access_token")?.value
    const refreshToken = request.cookies.get("refresh_token")?.value

    if (!accessToken && !refreshToken) {
        const signInUrl = new URL("/signin" , request.url)

        return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
      "/" , 
      "/menu/:path" , 
      "/orders/:path" , 
      "/profile/:path" , 
      "/dashboard/:path "
    ]
}
