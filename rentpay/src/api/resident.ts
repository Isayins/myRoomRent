import {PageData, Resident} from '../types/feeTypes';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/fees/residents';

export const getResidentsPage = async (page = 1, size = 10): Promise<PageData<Resident>> => {
    const response = await axios.get<PageData<Resident>>(API_BASE );
    return response.data;
};
