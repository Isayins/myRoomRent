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