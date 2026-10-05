export const ORDER_STATUSES = [
    "pending",
    "preparing",
    "ready",
    "delivered",
    "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
    id: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: {
        id: string;
        name: string;
        imageUrl: string | null;
    };
}

export interface Order {
    id: string;
    status: OrderStatus;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    notes: string | null;
    items: OrderItem[];
}