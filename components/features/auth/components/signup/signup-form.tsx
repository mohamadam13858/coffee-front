"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import PasswordInput from "../shared/password-input";

import { getHttpError } from "@/lib/http";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignUpFormValues, signUpSchema } from "../../schemas/signup.schema";
import { signUp } from "../../services/auth.service";

export function SignUpForm() {
    const router = useRouter();

    const [serverError, setServerError] =
        useState<string | null>(null);

    const form =
        useForm<SignUpFormValues>({
            resolver:
                zodResolver(signUpSchema),

            defaultValues: {
                firstName: "",
                lastName: "",
                mobile: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptedTerms: false,
            },
        });

    const onSubmit = async (
        values: SignUpFormValues,
    ) => {
        setServerError(null);

        try {
            await signUp({
                firstName: values.firstName,
                lastName: values.lastName,
                mobile: values.mobile,
                email: values.email,
                password: values.password,
            });

            router.push("/signin");
        } catch (error) {
            const parsedError =
                getHttpError(error);

            setServerError(
                parsedError.message,
            );
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    onSubmit,
                )}
                className="w-full space-y-6"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    نام
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="نام"
                                        className="
                      h-11
                      bg-neutral-900/70
                      border-neutral-800
                      text-white
                      placeholder:text-neutral-600
                      focus-visible:border-amber-500
                      focus-visible:ring-amber-500/20
                    "
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    نام خانوادگی
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="نام خانوادگی"
                                        className="
                      h-11
                      bg-neutral-900/70
                      border-neutral-800
                      text-white
                      placeholder:text-neutral-600
                      focus-visible:border-amber-500
                      focus-visible:ring-amber-500/20
                    "
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                شماره موبایل
                            </FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    type="tel"
                                    inputMode="numeric"
                                    dir="ltr"
                                    placeholder="09123456789"
                                    className="
                    h-11
                    bg-neutral-900/70
                    border-neutral-800
                    text-white
                    placeholder:text-neutral-600
                    focus-visible:border-amber-500
                    focus-visible:ring-amber-500/20
                  "
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                ایمیل
                            </FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    dir="ltr"
                                    placeholder="example@gmail.com"
                                    className="
                    h-11
                    bg-neutral-900/70
                    border-neutral-800
                    text-white
                    placeholder:text-neutral-600
                    focus-visible:border-amber-500
                    focus-visible:ring-amber-500/20
                  "
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                رمز عبور
                            </FormLabel>

                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    placeholder="رمز عبور"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                تکرار رمز عبور
                            </FormLabel>

                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    placeholder="تکرار رمز عبور"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="acceptedTerms"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-start gap-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={
                                            field.onChange
                                        }
                                    />
                                </FormControl>

                                <FormLabel className="cursor-pointer leading-6">
                                    با ثبت نام، قوانین و حریم
                                    خصوصی را می‌پذیرم
                                </FormLabel>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {serverError && (
                    <div
                        role="alert"
                        className="
              rounded-lg
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
            "
                    >
                        {serverError}
                    </div>
                )}

                <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={
                        form.formState.isSubmitting
                    }
                >
                    {form.formState.isSubmitting
                        ? "لطفا صبر کنید..."
                        : "ثبت نام"}
                </Button>
            </form>
        </Form>
    );
}