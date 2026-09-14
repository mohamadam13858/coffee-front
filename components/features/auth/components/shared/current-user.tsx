import { getCurrentUser } from "@/components/features/auth/server/session";

export async function CurrentUser() {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    return (
        <div>
            سلام {user.firstName}
        </div>
    );
}
