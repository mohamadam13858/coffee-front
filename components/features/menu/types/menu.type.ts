export interface Category {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    orderIndex: number;
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    discountPrice: number | null;
    isAvailable: boolean;
    isActive: boolean;
    imageUrl: string | null;
    categoryId: string;
}