import { httpClient } from "@/lib/http";
import { AuthResponse, SignInRequest, SignUpRequest } from "../types/auth.type";



export async function signUp(data: SignUpRequest): Promise<void> {
    await httpClient.post('/auth/signup', data)
}

export async function signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await httpClient.post('/auth/signin', data)
    return response.data
}

export async function refreshSession(): Promise<void> {
    await httpClient.post("/auth/refresh")
}


export async function logout(): Promise<void> {
    await httpClient.post("/auth/logout")
}