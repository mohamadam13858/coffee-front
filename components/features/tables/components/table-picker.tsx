"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Armchair } from "lucide-react";
import { TableStatusBadge } from "./table-status-badge";
import { CafeTable, SelectedTable } from "../types/table.type";
import { selectTable } from "../actions/select-table";

const STATUS_HINT: Record<CafeTable["status"], string> = {
    available: "آزاد",
    occupied: "اشغال",
    reserved: "رزرو",
    maintenance: "خارج از دسترس",
};

function canSelectTable(table: CafeTable, selectedId?: string) {
    if (table.id === selectedId) {
        return true;
    }

    return table.status === "available";
}

export function TablePicker({
    tables,
    selectedTable,
}: {
    tables: CafeTable[];
    selectedTable: SelectedTable | null;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [pendingTableId, setPendingTableId] = useState<string | null>(null);

    const onSelect = (table: CafeTable) => {
        if (!canSelectTable(table, selectedTable?.id)) {
            toast.error(`میز ${table.number} ${STATUS_HINT[table.status]} است`);
            return;
        }

        if (table.id === selectedTable?.id) {
            return;
        }

        setPendingTableId(table.id);

        startTransition(async () => {
            try {
                await selectTable(table.id, table.number);
                toast.success(`میز ${table.number} انتخاب شد`);
                router.refresh();
            } catch {
                toast.error("انتخاب میز انجام نشد");
            } finally {
                setPendingTableId(null);
            }
        });
    };

    if (tables.length === 0) {
        return (
            <div className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 px-5 py-10 text-center">
                <Armchair className="mx-auto mb-3 h-8 w-8 text-neutral-600" />
                <p className="text-sm text-neutral-400">
                    هنوز میزی برای نمایش ثبت نشده است
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {tables.map((table) => {
                const selected = table.id === selectedTable?.id;
                const selectable = canSelectTable(table, selectedTable?.id);
                const loading = pendingTableId === table.id && isPending;

                return (
                    <button
                        key={table.id}
                        type="button"
                        disabled={!selectable || isPending}
                        onClick={() => onSelect(table)}
                        className={`
                            relative
                            flex
                            min-h-24
                            flex-col
                            items-center
                            justify-center
                            gap-1.5
                            rounded-2xl
                            border
                            px-2
                            py-3
                            transition-all
                            ${selected
                                ? "border-amber-500 bg-amber-500/15 shadow-[0_0_24px_rgba(245,158,11,0.18)]"
                                : selectable
                                    ? "border-neutral-800/80 bg-neutral-950/50 hover:border-amber-500/40 hover:bg-amber-500/5"
                                    : "cursor-not-allowed border-neutral-900 bg-neutral-950/30 opacity-45"
                            }
                        `}
                    >
                        <span className="text-[11px] text-neutral-500">میز</span>
                        <span className="text-2xl font-bold tracking-tight text-white">
                            {table.number}
                        </span>
                        <TableStatusBadge status={table.status} selected={selected} />
                        {table.capacity ? (
                            <span className="text-[11px] text-neutral-500">
                                {table.capacity} نفر
                            </span>
                        ) : null}
                        {loading ? (
                            <span className="absolute inset-0 rounded-2xl bg-black/40" />
                        ) : null}
                    </button>
                );
            })}
        </div>
    );
}