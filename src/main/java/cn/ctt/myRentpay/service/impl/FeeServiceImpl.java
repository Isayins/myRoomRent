package cn.ctt.myRentpay.service.impl;

import cn.ctt.myRentpay.entity.Resident;
import cn.ctt.myRentpay.exception.BusinessException;
import cn.ctt.myRentpay.mapper.ResidentMapper;
import cn.ctt.myRentpay.service.FeeService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 费用服务实现类
 * 继承ServiceImpl获得MyBatis Plus基础CRUD能力
 */
@Service
@RequiredArgsConstructor
public class FeeServiceImpl
        extends ServiceImpl<ResidentMapper, Resident>
        implements FeeService {

    private final ResidentMapper residentMapper;

    @Override
    @Transactional(readOnly = true) // 只读事务
    public Resident getResidentDetail(String roomNumber) {
        return this.lambdaQuery()
                .eq(Resident::getRoomNumber, roomNumber)
                .oneOpt()
                .orElseThrow(() -> new BusinessException("住户不存在"));
    }

    @Override
    @Transactional(rollbackFor = Exception.class) // 事务管理
    public boolean processPayment(String roomNumber) {
        Resident resident = getResidentDetail(roomNumber);

        // 校验缴费状态
        if (resident.getPaid()) {
            throw new BusinessException("该住户已缴费，请勿重复操作");
        }

        // 带乐观锁更新
        int updateCount = residentMapper.updatePaymentStatus(
                roomNumber,
                true,
                resident.getVersion()
        );

        if (updateCount == 0) {
            throw new BusinessException("缴费失败，请重试");
        }
        return true;
    }

    @Override
    public Page<Resident> getResidentsWithPagination(int page, int size) {
        // 使用分页查询获取住户数据
        LambdaQueryWrapper<Resident> queryWrapper = new LambdaQueryWrapper<Resident>()
                .orderByAsc(Resident::getRoomNumber);
        Page<Resident> residentPage = this.page(new Page<>(page, size), queryWrapper);
        // 如果需要调试打印，可使用日志记录而非System.out.println
        // logger.debug("分页查询结果: {}", residentPage.getRecords());
        return residentPage;
    }
}
