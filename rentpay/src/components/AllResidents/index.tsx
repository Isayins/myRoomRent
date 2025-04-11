import React, { useEffect, useState } from 'react';
import { Resident, PageData } from '../../types/feeTypes';
import { getResidentsPage } from '../../api/resident';
import styles from './styles.module.css';

const AllResidents = () => {
    // 使用分页数据接口来保存返回结果
    const [pageData, setPageData] = useState<PageData<Resident> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 注意这里传递页码和每页大小，默认可以写死或者通过组件状态管理
                const data = await getResidentsPage(1, 10);
                setPageData(data);
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
                <>
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
                        {pageData?.records.map((resident) => (
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
                    {/* 分页信息展示 */}
                    <div className={styles.paginationInfo}>
                        <span>当前第 {pageData?.current} 页，共 {pageData?.pages} 页</span>
                        <span>总记录数: {pageData?.total}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllResidents;
