"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
    TABLE_ID_COOKIE,
    TABLE_NUMBER_COOKIE,
} from "../constants";

export async function selectTable(tableId: string, tableNumber: string) {
    if (!tableId.trim() || !tableNumber.trim()) {
        return;
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
}
