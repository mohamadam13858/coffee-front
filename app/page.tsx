'use client';

import { CurrentUser } from "@/components/features/auth/components/shared/current-user";
;
import { Suspense } from "react";

export default function WelcomePage() {

  return (
    <>
      <main>
        <h1>کافه کزوسان</h1>

        <Suspense fallback={<p>در حال بررسی حساب...</p>}>
          <CurrentUser />
        </Suspense>
      </main>
    </>
  );
}