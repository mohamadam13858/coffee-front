import "server-only"

import { cache } from "react";
import { User } from "../../users/types/user.type";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("access_token")?.value
    const refreshToken = cookieStore.get("refresh_token")?.value

    if (!accessToken && !refreshToken) {
        return null
    }

    const cookieHeader = [
        accessToken ? `access_token=${accessToken}` : null,
        refreshToken ? `refresh_token=${refreshToken}` : null
    ].filter(Boolean).join("; ")

    try {

        const response = await fetch(
            `${API_URL}/users/me`,
            {
                headers: {
                    Cookie: cookieHeader,
                    Accept: "application/json",
                },
                cache: "no-store",
            },
        )

        if (response.status === 401) {
            return null
        }

        if (!response.ok) {
            throw new Error(
                `Failed to fetch current user: ${response.status}`,
            );
        }

        return response.json()

    } catch (error) {
        return null
    }
})