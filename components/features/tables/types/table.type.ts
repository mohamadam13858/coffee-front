export const TABLE_STATUSES = [
    "available",
    "occupied",
    "reserved",
    "maintenance",
] as const;

export type TableStatus = (typeof TABLE_STATUSES)[number];

export interface CafeTable {
    id: string;
    number: string;
    status: TableStatus;
    capacity?: number | null;
    isActive: boolean;
}

export interface SelectedTable {
    id: string;
    number: string;
}
