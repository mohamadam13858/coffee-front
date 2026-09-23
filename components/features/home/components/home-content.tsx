import { Armchair } from "lucide-react";
import { requireUser } from "@/components/features/auth/server/session";
import { TablePicker } from "@/components/features/tables/components/table-picker";
import {
    getSelectedTable,
    getTables,
} from "@/components/features/tables/server/tables";
import { HomeGreeting } from "./home-greeting";
import { HomeSelectedTable } from "./home-selected-table";

export async function HomeContent() {
    const [user, tables, selectedTable] = await Promise.all([
        requireUser(),
        getTables(),
        getSelectedTable(),
    ]);

    return (
        <div className="space-y-6">
            <HomeGreeting firstName={user.firstName} />

            <section
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-neutral-800/70
                    bg-white/[0.025]
                    shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                    backdrop-blur-xl
                "
            >
                <div className="border-b border-neutral-800/70 px-6 py-5">
                    <div className="mb-2 flex items-center gap-2 text-amber-400/90">
                        <Armchair className="h-4 w-4" />
                        <p className="text-sm font-medium">انتخاب میز</p>
                    </div>
                    <h2 className="text-lg font-bold text-white">
                        شماره میز خود را انتخاب کنید
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                        بعد از انتخاب میز، منو برایتان باز می‌شود
                    </p>
                </div>

                <div className="px-5 py-5">
                    <TablePicker
                        tables={tables}
                        selectedTable={selectedTable}
                    />
                </div>
            </section>

            <HomeSelectedTable selectedTable={selectedTable} />
        </div>
    );
}