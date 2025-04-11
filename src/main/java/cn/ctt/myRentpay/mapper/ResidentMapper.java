package cn.ctt.myRentpay.mapper;

import cn.ctt.myRentpay.entity.Resident;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

/**
 * 住户数据访问层接口
 * 继承MyBatis Plus的BaseMapper获得基础CRUD能力
 */
public interface ResidentMapper extends BaseMapper<Resident> {

    /**
     * 更新缴费状态（带乐观锁校验）
     * @param roomNumber 房号
     * @param paid 缴费状态
     * @param version 当前版本号
     * @return 影响行数
     */
    @Update("UPDATE t_resident SET paid = #{paid}, version = version + 1 " +
            "WHERE room_number = #{roomNumber} AND version = #{version}")
    int updatePaymentStatus(
            @Param("roomNumber") String roomNumber,
            @Param("paid") boolean paid,
            @Param("version") int version
    );
}