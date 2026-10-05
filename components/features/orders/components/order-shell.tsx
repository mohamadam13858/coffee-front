import Link from "next/link";
import { ArrowRight, ReceiptText } from "lucide-react";
import type { ReactNode } from "react";

export function OrderShell({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 pb-10 pt-8">
            <header className="mb-6 flex items-center gap-3">
                <Link
                    href="/menu"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800/70 text-neutral-400 transition-colors hover:text-white"
                >
                    <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2">
                    <ReceiptText className="h-5 w-5 text-amber-400" />
                    <h1 className="text-lg font-bold text-white">سفارش من</h1>
                </div>
            </header>
            {children}
        </div>
    );
}