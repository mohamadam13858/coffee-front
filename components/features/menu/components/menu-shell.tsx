import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";

export function MenuShell({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 pb-10 pt-8">
            <header className="mb-6 flex items-center gap-3">
                <Link
                    href="/"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800/70 text-neutral-400 transition-colors hover:text-white"
                >
                    <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-amber-400" />
                    <h1 className="text-lg font-bold text-white">منو</h1>
                </div>
            </header>
            {children}
        </div>
    );
}