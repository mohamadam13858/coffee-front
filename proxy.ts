import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const REFRESH_LEEWAY_SECONDS = 30;

const protectedRoutes = ["/", "/menu", "/orders", "/profile", "/dashboard"];

function isProtectedRoute(pathname: string) {
    return protectedRoutes.some((route) => {
        if (route === "/") {
            return pathname === "/";
        }
        return pathname === route || pathname.startsWith(`${route}/`);
    });
}

function getTokenExpiry(token: string): number | null {
    try {
        const [, payloadPart] = token.split(".");
        if (!payloadPart) {
            return null;
        }
        const json = Buffer.from(payloadPart, "base64url").toString("utf-8");
        const payload = JSON.parse(json) as { exp?: number };
        return typeof payload.exp === "number" ? payload.exp : null;
    } catch {
        return null;
    }
}

function isTokenExpired(token: string) {
    const exp = getTokenExpiry(token);
    if (exp === null) {
        return true;
    }
    const nowInSeconds = Date.now() / 1000;
    return exp - REFRESH_LEEWAY_SECONDS <= nowInSeconds;
}

async function refreshTokens(refreshToken: string) {
    if (!API_URL) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as {
            accessToken?: string;
            refreshToken?: string;
        };

        if (!data.accessToken || !data.refreshToken) {
            return null;
        }

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            setCookieHeaders: response.headers.getSetCookie(),
        };
    } catch {
        return null;
    }
}

function redirectToSignIn(request: NextRequest) {
    const signInUrl = new URL("/signin", request.url);
    const response = NextResponse.redirect(signInUrl);
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!isProtectedRoute(pathname)) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    if (!accessToken && !refreshToken) {
        return redirectToSignIn(request);
    }

    const needsRefresh = !accessToken || isTokenExpired(accessToken);

    if (!needsRefresh) {
        return NextResponse.next();
    }

    if (!refreshToken) {
        return redirectToSignIn(request);
    }

    const refreshed = await refreshTokens(refreshToken);

    if (!refreshed) {
        return redirectToSignIn(request);
    }

    const cookieMap = new Map(
        request.cookies.getAll().map((cookie) => [cookie.name, cookie.value]),
    );
    cookieMap.set(ACCESS_TOKEN_COOKIE, refreshed.accessToken);
    cookieMap.set(REFRESH_TOKEN_COOKIE, refreshed.refreshToken);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
        "cookie",
        Array.from(cookieMap.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join("; "),
    );

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    for (const cookie of refreshed.setCookieHeaders) {
        response.headers.append("set-cookie", cookie);
    }

    return response;
}

export const config = {
    matcher: [
        "/",
        "/menu/:path*",
        "/orders/:path*",
        "/profile/:path*",
        "/dashboard/:path*",
    ],
};