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
    isActive: boolean;
}