import { z } from 'zod'


export const signUpSchema = z.object({
    name: z.string().trim().min(2, 'نام باید حداقل ۲ کاراکتر داشته باشد').max(50, 'نام نمیتواند بیشتر از ۵۰ کاراکتر باشد '),
    phone: z.string().trim().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(1, 'تکرار رمز عبور الزامی است'),
    acceptedTerms: z.boolean().refine((value) => value === true, {
        message: "پذیرش قرانین الزامی است"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'رمز های عبور یکسان نیست',
    path: ["confirmPassword"]
})