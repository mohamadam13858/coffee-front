    'use client'
    import { Button } from '@/components/ui/button'
    import { Input } from '@/components/ui/input'
    import { cn } from '@/lib/utils'
    import { Eye, EyeOff } from 'lucide-react'
    import React, { useState } from 'react'
    import type { ComponentProps } from 'react'

    type PasswordInputProps = ComponentProps<typeof Input>
    export default function PasswordInput({ className, ...props }: PasswordInputProps) {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <div className='relative'>
                <Input {...props} type={showPassword ? 'text' : 'password'} className={cn(
                    "h-11 bg-neutral-900/70 border-neutral-800 text-white",
                    "placeholder:text-neutral-600",
                    "focus-visible:border-amber-500",
                    "focus-visible:ring-amber-500/20",
                    className
                )} />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                    absolute
                    left-2
                    top-1/2
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-md
                    text-neutral-500
                    transition-colors
                    hover:bg-transparent
                    hover:text-neutral-300
                    focus:outline-none
                    focus:ring-0
                    cursor-pointer
    "
                    aria-label={
                        showPassword
                            ? 'مخفی کردن رمز عبور'
                            : 'نمایش رمز عبور'
                    }
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>


        )
    }
