import { Suspense } from "react";
import { HomeContent } from "@/components/features/home/components/home-content";
import { HomeContentFallback } from "@/components/features/home/components/home-content-fallback";
import { HomeShell } from "@/components/features/home/components/home-shell";

export default function HomePage() {
    return (
        <HomeShell>
            <Suspense fallback={<HomeContentFallback />}>
                <HomeContent />
            </Suspense>
        </HomeShell>
    );
}