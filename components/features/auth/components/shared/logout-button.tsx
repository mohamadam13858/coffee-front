"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";


import { getHttpError } from "@/lib/http";
import { logout } from "../../services/auth.service";

export function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            await logout();

            toast.success("با موفقیت خارج شدید");

            router.replace("/signin");
            router.refresh();
        } catch (error) {
            const parsedError = getHttpError(error);

            toast.error(parsedError.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <LogOut className="h-4 w-4" />

            <span>
                {isLoading ? "در حال خروج..." : "خروج از حساب"}
            </span>
        </button>
    );
}