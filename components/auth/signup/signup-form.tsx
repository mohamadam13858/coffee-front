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
            <form className='w-full flex flex-col gap-4 ' onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel className='text-sm font-medium text-neutral-300'>
                                نام و نام خانوادگی
                            </FormLabel>

                            <FormControl>
                                <Input className='h-11  bg-neutral-900/70 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20' placeholder='نام و نام خانوادگی'  {...field} />
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
                            <FormLabel className='text-sm font-medium text-neutral-300'>
                                شماره موبایل
                            </FormLabel>

                            <FormControl>
                                <Input className='h-11  bg-neutral-900/70 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:border-amber-500 focus-visible:ring-amber-500/20' type='tel' inputMode='numeric' placeholder='09123456789' dir='ltr'  {...field} />
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
                            <FormLabel className='text-sm font-medium text-neutral-300'>
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
                            <FormLabel className='text-sm font-medium text-neutral-300'>
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

                                <FormLabel className='text-sm font-medium text-neutral-300'>
                                    با ثبت‌نام، قوانین و حریم خصوصی را می‌پذیرم
                                </FormLabel>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button className="h-11 w-full bg-amber-800 font-medium text-white shadow-lg shadow-amber-950/20 transition-all hover:bg-amber-700 hover:shadow-amber-950/30 cursor-pointer" type='submit'  disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'لطفا صبر کنید...' : 'ثبت نام'}
                </Button>
            </form>
        </Form>
    )
}