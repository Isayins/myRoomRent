import React, { useState } from 'react';
import { FeeData } from '../../types/feeTypes';
import { getFeeByRoomNumber, payFee } from '../../api/fee';
import styles from "./styles.module.css";

const FeeDisplay = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [feeData, setFeeData] = useState<FeeData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!roomNumber) return;

        setLoading(true);
        try {
            const data = await getFeeByRoomNumber(roomNumber);
            setFeeData(data);
        } catch (error) {
            alert('查询失败，请检查房号是否正确');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!roomNumber || !feeData) return;

        try {
            await payFee(roomNumber);
            const updatedData = await getFeeByRoomNumber(roomNumber);
            setFeeData(updatedData);
            alert('缴费成功！');
        } catch (error) {
            alert('缴费失败，请稍后重试');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value.trim())}
                    placeholder="请输入房号（如：A1001）"
                    className={styles.input}
                />
                <button
                    onClick={handleSearch}
                    className={styles.searchButton}
                    disabled={loading}
                >
                    {loading ? '查询中...' : '查询费用'}
                </button>
            </div>

            {feeData && (
                <div className={styles.resultBox}>
                    <h3 className={styles.roomNumber}>{feeData.roomNumber} 费用明细</h3>
                    <div className={styles.detailItem}>
                        <label>水费：</label>
                        <span>¥{feeData.waterFee.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <label>电费：</label>
                        <span>¥{feeData.electricFee.toFixed(2)}</span>
                    </div>
                    <div className={styles.total}>
                        <label>合计应缴：</label>
                        <span>¥{(feeData.waterFee + feeData.electricFee).toFixed(2)}</span>
                    </div>
                    <div className={styles.status}>
                        状态：
                        <span className={feeData.paid ? styles.paid : styles.unpaid}>
              {feeData.paid ? '已缴费 ✅' : '未缴费 ❌'}
            </span>
                    </div>

                    {!feeData.paid && (
                        <button
                            onClick={handlePayment}
                            className={styles.payButton}
                        >
                            立即支付
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeeDisplay;