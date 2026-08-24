"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/components/features/auth/schemas/signup.schema'
import { SignUpFormValues } from '@/components/features/auth/types/auth.type'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '../shared/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel>
                                نام و نام خانوادگی
                            </FormLabel>

                            <FormControl>
                                <Input placeholder='نام و نام خانوادگی'  {...field} />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}


                />

                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel>
                                شماره موبایل
                            </FormLabel>

                            <FormControl>
                                <Input type='tel' inputMode='numeric' placeholder='091234567891' dir='ltr'  {...field} />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}


                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel>
                                رمز عبور
                            </FormLabel>

                            <FormControl>
                                <PasswordInput placeholder='رمز عبور'  {...field} />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}


                />


                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel>
                                تکرار رمز عبور
                            </FormLabel>

                            <FormControl>
                                <PasswordInput placeholder='تکرار رمز عبور'  {...field} />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}


                />


                <FormField
                    control={form.control}
                    name='acceptedTerms'
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex items-start gap-3'>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>

                                <FormLabel>
                                    با ثبت نام . قوانین و حریم خصوصی را میپذیرم
                                </FormLabel>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type='submit' className={"w-full"} disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'لطفا صبر کنید...' : 'ثبت نام'}
                </Button>
            </form>
        </Form>
    )
}