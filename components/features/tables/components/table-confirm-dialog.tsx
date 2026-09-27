"use client";

import { X } from "lucide-react";

export function TableConfirmDialog({
    tableNumber,
    isSubmitting,
    onConfirm,
    onCancel,
}: {
    tableNumber: string;
    isSubmitting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
            onClick={onCancel}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-sm rounded-t-3xl border border-neutral-800 bg-neutral-950 p-6 sm:rounded-3xl"
            >
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-bold text-white">تایید میز</h3>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-neutral-500 hover:text-white"
                        aria-label="بستن"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mb-6 text-sm leading-6 text-neutral-400">
                    میز <span className="font-bold text-amber-400">{tableNumber}</span> را
                    برای سفارش انتخاب می‌کنید؟ بعد از تایید، وارد صفحه‌ی منو می‌شوید.
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 rounded-2xl border border-neutral-800 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-900 disabled:opacity-50"
                    >
                        انصراف
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-1 rounded-2xl bg-amber-500 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
                    >
                        {isSubmitting ? "در حال ثبت..." : "تایید و ورود به منو"}
                    </button>
                </div>
            </div>
        </div>
    );
}