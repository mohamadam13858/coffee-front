"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {  signUpSchema } from '@/components/features/auth/schemas/signup.schema'
import { SignUpFormValues } from '@/components/features/auth/types/auth.type'

export function SignUpForm() {
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
            acceptedTerms: false
        }
    })

    const onSubmit = async (values: SignUpFormValues) => {
        console.log(values)
    }


    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
        >

        </form>
    )
}