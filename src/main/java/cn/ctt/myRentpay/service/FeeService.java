package cn.ctt.myRentpay.service;

import cn.ctt.myRentpay.entity.Resident;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;


/**
 * 费用服务接口
 * 定义业务操作方法
 */
public interface FeeService {

    /**
     * 根据房号查询住户详情
     * @param roomNumber 房号
     * @return 住户对象
     */
    Resident getResidentDetail(String roomNumber) throws Exception;

    /**
     * 处理缴费业务
     * @param roomNumber 房号
     * @return 缴费结果
     */
    boolean processPayment(String roomNumber) throws Exception;

    /**
     * 分页查询住户列表
     * @param page 当前页码
     * @param size 每页数量
     * @return 分页结果
     */
    Page<Resident> getResidentsWithPagination(int page, int size);
}