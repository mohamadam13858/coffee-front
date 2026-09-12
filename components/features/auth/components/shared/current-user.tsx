import { getCurrentUser } from "@/components/features/users/services/user.service";



export async function CurrentUser() {
    const user = await getCurrentUser()

    if (!user) {
        return null
    }

    return (
        <div>
            سلام {user.firstName}
        </div>
    )
}