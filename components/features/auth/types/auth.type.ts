
export interface SignUpRequest {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string
}


export interface SignInRequest {
    mobile: string;
    password: string
}


export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    role: string
}


export interface  AuthResponse {
  message?: string
  user?: AuthUser
}