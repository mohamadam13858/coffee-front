import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import {
    TABLE_ID_COOKIE,
    TABLE_NUMBER_COOKIE,
} from "../constants";
import type { CafeTable, SelectedTable, TableStatus } from "../types/table.type";
import { TABLE_STATUSES } from "../types/table.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

function isTableStatus(value: unknown): value is TableStatus {
    return (
        typeof value === "string" &&
        TABLE_STATUSES.includes(value as TableStatus)
    );
}

function toCafeTable(value: unknown): CafeTable | null {
    if (!value || typeof value !== "object") {
        return null;
    }

    const table = value as Record<string, unknown>;

    if (typeof table.id !== "string" || typeof table.number !== "string") {
        return null;
    }

    return {
        id: table.id,
        number: table.number,
        status: isTableStatus(table.status) ? table.status : "available",
        capacity: typeof table.capacity === "number" ? table.capacity : null,
        isActive: table.isActive !== false,
    };
}

function sortTables(tables: CafeTable[]) {
    return [...tables].sort((a, b) => {
        const aNumber = Number(a.number);
        const bNumber = Number(b.number);

        if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
            return aNumber - bNumber;
        }

        return a.number.localeCompare(b.number, "fa");
    });
}

export const getTables = cache(async (): Promise<CafeTable[]> => {
    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}/table`, {
            headers: {
                Cookie: cookieHeader,
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const payload: unknown = await response.json();
        const rows = Array.isArray(payload) ? payload : [];

        return sortTables(
            rows
                .map(toCafeTable)
                .filter((table): table is CafeTable => table !== null)
                .filter((table) => table.isActive),
        );
    } catch {
        return [];
    }
});

export const getSelectedTable = cache(async (): Promise<SelectedTable | null> => {
    const cookieStore = await cookies();
    const id = cookieStore.get(TABLE_ID_COOKIE)?.value;
    const number = cookieStore.get(TABLE_NUMBER_COOKIE)?.value;

    if (!id || !number) {
        return null;
    }

    return { id, number };
});