import React, { useEffect, useState } from 'react';
import { Resident } from '../../types/feeTypes';
import { getAllResidents } from '../../api/resident';
import styles from './styles.module.css';

const AllResidents = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllResidents();
                setResidents(data);
            } catch (error) {
                console.error('加载住户信息失败:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.tableContainer}>
            {loading ? (
                <div className={styles.loading}>加载中...</div>
            ) : (
                <table className={styles.residentsTable}>
                    <thead>
                    <tr>
                        <th>房号</th>
                        <th>住户姓名</th>
                        <th>水费（元）</th>
                        <th>电费（元）</th>
                        <th>缴费状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    {residents.map((resident) => (
                        <tr key={resident.roomNumber}>
                            <td>{resident.roomNumber}</td>
                            <td>{resident.name || '-'}</td>
                            <td>{resident.waterFee.toFixed(2)}</td>
                            <td>{resident.electricFee.toFixed(2)}</td>
                            <td>
                  <span className={resident.paid ? styles.paid : styles.unpaid}>
                    {resident.paid ? '已缴费' : '未缴费'}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllResidents;