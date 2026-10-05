"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import { getSelectedTable } from "@/components/features/tables/server/tables";
import { ORDER_ID_COOKIE } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type AddToOrderResult =
    | { success: true }
    | { success: false; message: string };

async function createNewOrder(
    cookieHeader: string,
    tableId: string,
    productId: string,
    quantity: number,
): Promise<AddToOrderResult> {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ tableId, items: [{ productId, quantity }] }),
    });

    if (!response.ok) {
        return { success: false, message: "ثبت سفارش انجام نشد" };
    }

    const order = (await response.json()) as { id: string };

    const cookieStore = await cookies();
    cookieStore.set(ORDER_ID_COOKIE, order.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 6 * 60 * 60,
    });

    return { success: true };
}

export async function addToOrder(
    productId: string,
    quantity: number,
): Promise<AddToOrderResult> {
    if (quantity < 1) {
        return { success: false, message: "تعداد نامعتبر است" };
    }

    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader || !API_URL) {
        return { success: false, message: "لطفا دوباره وارد شوید" };
    }

    const selectedTable = await getSelectedTable();

    if (!selectedTable) {
        return { success: false, message: "ابتدا یک میز انتخاب کنید" };
    }

    const cookieStore = await cookies();
    const existingOrderId = cookieStore.get(ORDER_ID_COOKIE)?.value;

    let result: AddToOrderResult;

    try {
        if (existingOrderId) {
            const response = await fetch(`${API_URL}/orders/${existingOrderId}/items`, {
                method: "POST",
                headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            result = response.ok
                ? { success: true }
                : await createNewOrder(cookieHeader, selectedTable.id, productId, quantity);
        } else {
            result = await createNewOrder(cookieHeader, selectedTable.id, productId, quantity);
        }
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    if (result.success) {
        revalidatePath("/menu");
    }

    return result;
}