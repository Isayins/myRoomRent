package cn.ctt.myRentpay.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 住户实体类
 * 对应数据库表 t_resident
 */
@Data
@TableName("t_resident") // 指定数据库表名
public class Resident {

    @TableId(type = IdType.AUTO) // 主键自增策略
    private Long id;

    @TableField("room_number") // 数据库字段映射
    private String roomNumber; // 房号

    private String name;       // 住户姓名
    private BigDecimal waterFee;    // 水费
    private BigDecimal electricFee; // 电费
    private Boolean paid;      // 缴费状态

    @TableField(fill = FieldFill.INSERT) // 插入时自动填充
    private LocalDateTime createTime; // 创建时间

    @TableField(fill = FieldFill.INSERT_UPDATE) // 插入和更新时填充
    private LocalDateTime updateTime; // 更新时间

    @Version // 乐观锁版本字段
    private Integer version;

    @TableLogic // 逻辑删除标记（0-未删除，1-已删除）
    private Integer deleted;
}