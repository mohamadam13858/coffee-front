"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, UserRound } from "lucide-react";
import type { User } from "@/components/features/users/types/user.type";
import { updateProfile } from "../actions/update-profile";

export function ProfileCard({ user }: { user: User }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [email, setEmail] = useState(user.email ?? "");

    const onSave = () => {
        startTransition(async () => {
            const result = await updateProfile({ firstName, lastName, email });

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("پروفایل بروزرسانی شد");
            setIsEditing(false);
            router.refresh();
        });
    };

    const joinDate = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
    }).format(new Date(user.createdAt));

    return (
        <div className="rounded-3xl border border-neutral-800/70 bg-white/[0.025] p-5">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
                        <UserRound className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                        <p className="font-bold text-white">
                            {user.firstName || user.lastName
                                ? `${user.firstName} ${user.lastName}`.trim()
                                : "کاربر کافه"}
                        </p>
                        <p className="text-xs text-neutral-500">{user.mobile}</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 transition-colors hover:text-white"
                        aria-label="ویرایش پروفایل"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                ) : null}
            </div>

            {isEditing ? (
                <div className="space-y-3">
                    <input
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="نام"
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500/60"
                    />
                    <input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="نام خانوادگی"
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500/60"
                    />
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="ایمیل"
                        type="email"
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500/60"
                    />
                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            disabled={isPending}
                            className="flex-1 rounded-xl border border-neutral-800 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-900 disabled:opacity-50"
                        >
                            انصراف
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={isPending}
                            className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
                        >
                            {isPending ? "در حال ذخیره..." : "ذخیره"}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-neutral-500">عضو از {joinDate}</p>
            )}
        </div>
    );
}