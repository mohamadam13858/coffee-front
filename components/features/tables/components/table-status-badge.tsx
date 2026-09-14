import type { TableStatus } from "../../types/table.type";

const LABELS: Record<TableStatus, string> = {
    available: "آزاد",
    occupied: "اشغال",
    reserved: "رزرو",
    maintenance: "تعمیر",
};

export function TableStatusBadge({
    status,
    selected,
}: {
    status: TableStatus;
    selected?: boolean;
}) {
    if (selected) {
        return (
            <span className="text-[11px] font-medium text-amber-400">
                انتخاب شما
            </span>
        );
    }

    return (
        <span
            className={`
                text-[11px]
                ${status === "available" ? "text-emerald-400/80" : "text-neutral-500"}
            `}
        >
            {LABELS[status]}
        </span>
    );
}
