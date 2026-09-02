import { z } from "zod";

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, "نام باید حداقل ۲ کاراکتر باشد")
            .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

        lastName: z
            .string()
            .trim()
            .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
            .max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

        mobile: z
            .string()
            .trim()
            .regex(
                /^09\d{9}$/,
                "شماره موبایل معتبر نیست",
            ),

        email: z
            .string()
            .trim()
            .email("ایمیل معتبر نیست"),

        password: z
            .string()
            .min(
                6,
                "رمز عبور باید حداقل ۶ کاراکتر باشد",
            ),

        confirmPassword: z
            .string()
            .min(
                1,
                "تکرار رمز عبور الزامی است",
            ),

        acceptedTerms: z
            .boolean()
            .refine(
                (value) => value === true,
                {
                    message:
                        "پذیرش قوانین الزامی است",
                },
            ),
    })
    .refine(
        (data) =>
            data.password === data.confirmPassword,
        {
            message: "رمزهای عبور یکسان نیستند",
            path: ["confirmPassword"],
        },
    );

export type SignUpFormValues =
    z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    mobile: z
        .string()
        .trim()
        .regex(
            /^09\d{9}$/,
            "شماره موبایل معتبر نیست",
        ),

    password: z
        .string()
        .min(
            1,
            "رمز عبور الزامی است",
        ),
});

export type SignInFormValues =
    z.infer<typeof signInSchema>;