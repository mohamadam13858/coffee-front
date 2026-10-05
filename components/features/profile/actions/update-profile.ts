"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type UpdateProfileResult =
    | { success: true }
    | { success: false; message: string };

async function extractErrorMessage(response: Response): Promise<string> {
    try {
        const body = await response.json();
        if (Array.isArray(body?.message)) {
            return body.message.join("، ");
        }
        if (typeof body?.message === "string") {
            return body.message;
        }
    } catch {
        
    }
    return "ویرایش پروفایل انجام نشد";
}

export async function updateProfile(input: {
    firstName: string;
    lastName: string;
    email: string;
}): Promise<UpdateProfileResult> {
    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader || !API_URL) {
        return { success: false, message: "لطفا دوباره وارد شوید" };
    }

    let response: Response;

    try {
        response = await fetch(`${API_URL}/users/me`, {
            method: "PATCH",
            headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    if (!response.ok) {
        return { success: false, message: await extractErrorMessage(response) };
    }

    revalidatePath("/profile");
    return { success: true };
}