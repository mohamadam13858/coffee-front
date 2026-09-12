import { httpClient } from "@/lib/http";
import { User } from "../types/user.type";



export async function getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>("/users/me")

    return response.data
}