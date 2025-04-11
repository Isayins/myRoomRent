export interface FeeData {
    roomNumber: string;
    waterFee: number;
    electricFee: number;
    total: number;
    paid: boolean;
}

export interface Resident {
    roomNumber: string;
    name: string;
    waterFee: number;
    electricFee: number;
    paid: boolean;
}

export interface PageData<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}
