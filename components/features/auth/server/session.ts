import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import type { User } from "@/components/features/users/types/user.type";

export const getCurrentUser = cache(async (): Promise<User | null> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!accessToken && !refreshToken) {
        return null;
    }

    const cookieHeader = [
        accessToken ? `access_token=${accessToken}` : null,
        refreshToken ? `refresh_token=${refreshToken}` : null,
    ]
        .filter(Boolean)
        .join("; ");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            {
                headers: {
                    Cookie: cookieHeader,
                    Accept: "application/json",
                },
                cache: "no-store",
            },
        );

        if (response.status === 401) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch current user");
        }

        return response.json();
    } catch {
        return null;
    }
});

export async function requireUser(): Promise<User> {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/signin");
    }

    return user;
}