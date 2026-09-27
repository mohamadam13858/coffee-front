"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import {
    TABLE_ID_COOKIE,
    TABLE_NUMBER_COOKIE,
} from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type SelectTableResult =
    | { success: true }
    | { success: false; message: string };

export async function selectTable(
    tableId: string,
    tableNumber: string,
): Promise<SelectTableResult> {
    if (!tableId.trim() || !tableNumber.trim()) {
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

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax" as const,
        path: "/",
        maxAge: 12 * 60 * 60,
    };

    cookieStore.set(TABLE_ID_COOKIE, tableId, cookieOptions);
    cookieStore.set(TABLE_NUMBER_COOKIE, tableNumber, cookieOptions);

    revalidatePath("/");
    revalidatePath("/menu");

    return { success: true };
}