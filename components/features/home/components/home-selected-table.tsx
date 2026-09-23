import { Check } from "lucide-react";
import type { SelectedTable } from "@/components/features/tables/types/table.type";

export function HomeSelectedTable({
    selectedTable,
}: {
    selectedTable: SelectedTable | null;
}) {
    if (!selectedTable) {
        return (
            <p className="px-1 text-center text-sm text-neutral-500">
                هنوز میزی انتخاب نشده است
            </p>
        );
    }

    return (
        <div
            className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-amber-500/20
                bg-amber-500/10
                px-4
                py-4
            "
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
                <Check className="h-5 w-5 text-amber-400" />
            </div>
            <div>
                <p className="text-sm font-medium text-white">
                    میز {selectedTable.number} انتخاب شد
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                    صفحه منو در مرحله بعد اضافه می‌شود
                </p>
            </div>
        </div>
    );
}