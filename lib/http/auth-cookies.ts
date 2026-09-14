import "server-only";

import { cookies } from "next/headers";

export async function getAuthCookieHeader(): Promise<string | null> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!accessToken && !refreshToken) {
        return null;
    }

    return [
        accessToken ? `access_token=${accessToken}` : null,
        refreshToken ? `refresh_token=${refreshToken}` : null,
    ]
        .filter(Boolean)
        .join("; ");
}
