import { Coffee } from "lucide-react";
import type { ReactNode } from "react";

export function HomeShell({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 pb-10 pt-8">
            <header className="mb-8 flex items-center gap-3">
                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-amber-500/20
                        bg-amber-500/10
                        shadow-[0_0_40px_rgba(245,158,11,0.12)]
                    "
                >
                    <Coffee className="h-6 w-6 text-amber-400" />
                </div>

                <div>
                    <p className="text-xs text-amber-400/80">خوش آمدید به</p>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        کافه کروسان
                    </h1>
                </div>
            </header>

            {children}
        </div>
    );
}
