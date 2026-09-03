import { SignInForm } from "@/components/features/auth/components/signin/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import Link from "next/link";

export default function SignInPage() {
  return (
    <Card
      className="
        w-full
        overflow-hidden
        rounded-3xl
        border-neutral-800/70
        bg-white/[0.025]
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      <CardHeader className="px-7 pt-8 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">
          ورود به حساب
        </CardTitle>

        <CardDescription className="mt-2 text-sm leading-6 text-neutral-500">
          برای ادامه وارد حساب کاربری خود شوید
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <SignInForm />
      </CardContent>

      <CardFooter className="justify-center border-t border-neutral-800/70 bg-transparent">
        <p className="text-sm text-neutral-400">
          حساب کاربری ندارید؟

          <Link
            href="/signup"
            className="
              mr-1
              font-medium
              text-amber-500
              transition-colors
              hover:text-amber-400
            "
          >
            ثبت نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}