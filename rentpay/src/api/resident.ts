import { Resident } from '../types/feeTypes';

export const getAllResidents = async (): Promise<Resident[]> => {
    const response = await fetch('http://localhost:8080/api/fees/residents');
    if (!response.ok) throw new Error('Failed to fetch residents');
    return response.json();
};