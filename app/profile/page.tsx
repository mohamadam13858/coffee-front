import { Suspense } from "react";
import { ProfileContent } from "@/components/features/profile/components/profile-content";
import { ProfileContentFallback } from "@/components/features/profile/components/profile-content-fallback";
import { ProfileShell } from "@/components/features/profile/components/profile-shell";

export default function ProfilePage() {
    return (
        <ProfileShell>
            <Suspense fallback={<ProfileContentFallback />}>
                <ProfileContent />
            </Suspense>
        </ProfileShell>
    );
}