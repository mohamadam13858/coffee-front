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
import { Button } from "@/components/ui/button";

import PasswordInput from "../shared/password-input";




import { getHttpError } from "@/lib/http";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "../../services/auth.service";
import { SignInFormValues, signInSchema } from "../../schemas/signup.schema";

export function SignInForm() {
    const router = useRouter();

    const [serverError, setServerError] =
        useState<string | null>(null);

    const form =
        useForm<SignInFormValues>({
            resolver:
                zodResolver(signInSchema),

            defaultValues: {
                mobile: "",
                password: "",
            },
        });

    const onSubmit = async (
        values: SignInFormValues,
    ) => {
        setServerError(null);

        try {
            await signIn({
                mobile: values.mobile,
                password: values.password,
            });

            router.replace("/");
            router.refresh();
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
                    className="h-11 w-full bg-amber-700 hover:bg-amber-500 cursor-pointer"
                    disabled={
                        form.formState.isSubmitting
                    }
                >
                    {form.formState.isSubmitting
                        ? "در حال ورود..."
                        : "ورود"}
                </Button>
            </form>
        </Form>
    );
}