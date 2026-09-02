import {
    Coffee,
    Sparkles,
} from "lucide-react";

export function AuthBrand() {
    return (
        <div className="mb-6 text-center">
            <div
                className="
          mx-auto
          mb-4
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-amber-500/20
          bg-amber-500/10
          shadow-[0_0_40px_rgba(245,158,11,0.12)]
        "
            >
                <Coffee className="h-7 w-7 text-amber-400" />
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-amber-400/80">
                <Sparkles className="h-3.5 w-3.5" />

                <span>
                    کافه کروسان
                </span>

                <Sparkles className="h-3.5 w-3.5" />
            </div>
        </div>
    );
}