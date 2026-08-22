'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Coffee,
  User,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  UserPlus,
  Sparkles,
} from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10"
    >

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
            <Coffee className="h-7 w-7 text-amber-400" />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-amber-400/80">
            <Sparkles className="h-3.5 w-3.5" />
            <span>کافه سان کروسان</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Card */}
        <Card className="!border-0 overflow-hidden rounded-3xl bg-white/[0.025] shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <CardHeader className="px-7 pb-5 pt-8 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              ساخت حساب کاربری
            </CardTitle>

            <CardDescription className="mt-2 text-sm leading-6 text-neutral-500">
              برای شروع تجربه بهتر، اطلاعات خود را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent className="px-7 pb-7">
            <form className="space-y-5">

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-300"
                >
                  <User className="h-4 w-4 text-amber-500/70" />
                  نام و نام خانوادگی
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="مثلاً محمد حبیبی"
                  className="
                    h-11 rounded-xl
                    border-white/[0.08]
                    bg-black/20
                    text-white
                    placeholder:text-neutral-600
                    transition-all
                    focus:border-amber-500/60
                    focus:bg-black/30
                    focus:ring-4
                    focus:ring-amber-500/10
                  "
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label
                  htmlFor="mobile"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-300"
                >
                  <Phone className="h-4 w-4 text-amber-500/70" />
                  شماره موبایل
                </Label>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border-l border-white/10 pl-3 text-sm text-neutral-500">
                    ۰۹
                  </div>

                  <Input
                    id="mobile"
                    type="tel"
                    dir="ltr"
                    placeholder="۱۳۸۱۶۹۱۳۶"
                    className="
                      h-11 rounded-xl
                      border-white/[0.08]
                      bg-black/20
                      pl-4 pr-12
                      text-white
                      placeholder:text-neutral-600
                      transition-all
                      focus:border-amber-500/60
                      focus:bg-black/30
                      focus:ring-4
                      focus:ring-amber-500/10
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-300"
                >
                  <Lock className="h-4 w-4 text-amber-500/70" />
                  رمز عبور
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="
                      h-11 rounded-xl
                      border-white/[0.08]
                      bg-black/20
                      pl-11
                      text-white
                      placeholder:text-neutral-600
                      transition-all
                      focus:border-amber-500/60
                      focus:bg-black/30
                      focus:ring-4
                      focus:ring-amber-500/10
                    "
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? 'مخفی کردن رمز عبور'
                        : 'نمایش رمز عبور'
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      rounded-md p-1
                      text-neutral-600
                      transition-colors
                      hover:text-amber-400
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-neutral-600">
                  رمز عبور باید حداقل ۶ کاراکتر باشد
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2 text-sm font-medium text-neutral-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-amber-500/70" />
                  تکرار رمز عبور
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="
                      h-11 rounded-xl
                      border-white/[0.08]
                      bg-black/20
                      pl-11
                      text-white
                      placeholder:text-neutral-600
                      transition-all
                      focus:border-amber-500/60
                      focus:bg-black/30
                      focus:ring-4
                      focus:ring-amber-500/10
                    "
                  />

                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? 'مخفی کردن رمز عبور'
                        : 'نمایش رمز عبور'
                    }
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      rounded-md p-1
                      text-neutral-600
                      transition-colors
                      hover:text-amber-400
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked === true)
                    }
                    className="
                      mt-0.5
                      border-neutral-700
                      data-[state=checked]:border-amber-500
                      data-[state=checked]:bg-amber-500
                    "
                  />

                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-xs leading-6 text-neutral-500"
                  >
                    با ثبت‌نام،{' '}
                    <Link
                      href="/terms"
                      className="font-medium text-amber-500 transition-colors hover:text-amber-400"
                    >
                      قوانین
                    </Link>{' '}
                    و{' '}
                    <Link
                      href="/privacy"
                      className="font-medium text-amber-500 transition-colors hover:text-amber-400"
                    >
                      حریم خصوصی
                    </Link>{' '}
                    را می‌پذیرم.
                  </Label>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!acceptedTerms}
                className="
                  group
                  h-12
                  w-full
                  rounded-xl
                  bg-gradient-to-l
                  from-amber-600
                  to-amber-500
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-amber-950/30
                  transition-all
                  hover:from-amber-500
                  hover:to-amber-400
                  hover:shadow-xl
                  hover:shadow-amber-900/30
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <UserPlus className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                ساخت حساب کاربری
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#0c0b0a] px-4 text-[11px] text-neutral-600">
                  یا
                </span>
              </div>
            </div>

            {/* Sign in */}
            <div className="text-center text-sm">
              <span className="text-neutral-500">
                حساب کاربری دارید؟
              </span>{' '}

              <Link
                href="/signin"
                className="
                  font-semibold
                  text-amber-500
                  transition-colors
                  hover:text-amber-400
                "
              >
                وارد شوید
              </Link>
            </div>
          </CardContent>

          {/* Footer */}
          <div className="border-t border-white/[0.05] bg-black/10 px-7 py-4 text-center">
            <p className="text-[11px] text-neutral-700">
              © کافه سان کروسان • تمامی حقوق محفوظ است
            </p>
          </div>
        </Card>

        {/* Bottom text */}
        <p className="mt-5 text-center text-[11px] text-neutral-700">
          یک تجربه گرم، درست مثل اولین فنجان قهوه ☕
        </p>
      </div>
    </main>
  );
}