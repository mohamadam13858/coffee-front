import { Suspense } from "react";
import { MenuContent } from "@/components/features/menu/components/menu-content";
import { MenuContentFallback } from "@/components/features/menu/components/menu-content-fallback";
import { MenuShell } from "@/components/features/menu/components/menu-shell";

export default function MenuPage() {
    return (
        <MenuShell>
            <Suspense fallback={<MenuContentFallback />}>
                <MenuContent />
            </Suspense>
        </MenuShell>
    );
}