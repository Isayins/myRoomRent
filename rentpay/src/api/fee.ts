import { FeeData } from '../types/feeTypes';

const API_BASE = 'http://localhost:8080/api/fees';

export const getFeeByRoomNumber = async (roomNumber: string): Promise<FeeData> => {
    const response = await fetch(`${API_BASE}/${roomNumber}`);
    if (!response.ok) throw new Error('Failed to fetch fee data');
    return response.json();
};

export const payFee = async (roomNumber: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/${roomNumber}/pay`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error('Payment failed');
};