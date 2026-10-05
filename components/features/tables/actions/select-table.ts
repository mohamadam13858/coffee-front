"use server";

import { revalidatePath } from "next/cache";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type SelectTableResult =
    | { success: true }
    | { success: false; message: string };

export async function selectTable(tableId: string): Promise<SelectTableResult> {
    if (!tableId.trim()) {
        return { success: false, message: "میز نامعتبر است" };
    }

    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader || !API_URL) {
        return { success: false, message: "لطفا دوباره وارد شوید" };
    }

    let response: Response;

    try {
        response = await fetch(`${API_URL}/reservations/tables/${tableId}`, {
            method: "POST",
            headers: { Cookie: cookieHeader },
        });
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    if (!response.ok) {
        if (response.status === 409) {
            return { success: false, message: "این میز همین الان توسط شخص دیگری انتخاب شد" };
        }
        if (response.status === 404) {
            return { success: false, message: "این میز دیگر وجود ندارد" };
        }
        return { success: false, message: "انتخاب میز انجام نشد، دوباره تلاش کنید" };
    }

    revalidatePath("/");
    revalidatePath("/menu");

    return { success: true };
}