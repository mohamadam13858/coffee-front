import axios from "axios"
import { setupHttpInterceptors } from "./http-interceptors"


export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
    withCredentials:true , 
    headers: {
        "Content-Type": "application/json" , 
        Accept:  "application/json"
    },
    timeout: 10000,

})


setupHttpInterceptors(httpClient)