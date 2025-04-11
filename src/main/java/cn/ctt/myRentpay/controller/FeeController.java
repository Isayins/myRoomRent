package cn.ctt.myRentpay.controller;

import cn.ctt.myRentpay.entity.Resident;
import cn.ctt.myRentpay.service.FeeService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 费用控制器
 * 处理HTTP请求和响应
 */
@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeeController {

    private final FeeService feeService;

    /**
     * 获取住户费用详情
     * @param roomNumber 房号
     * @return 住户详情
     */
    @GetMapping("/{roomNumber}")
    public ResponseEntity<Resident> getFeeDetail(
            @PathVariable String roomNumber
    ) throws Exception {
        return ResponseEntity.ok(feeService.getResidentDetail(roomNumber));
    }

    /**
     * 执行缴费操作
     * @param roomNumber 房号
     * @return 操作结果
     */
    @PostMapping("/{roomNumber}/pay")
    public ResponseEntity<Boolean> processPayment(
            @PathVariable String roomNumber
    ) throws Exception {
        return ResponseEntity.ok(feeService.processPayment(roomNumber));
    }

    /**
     * 分页获取住户列表
     * @param page 页码
     * @param size 每页数量
     * @return 分页结果
     */
    @GetMapping("/residents")
    public ResponseEntity<Page<Resident>> getResidents(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                feeService.getResidentsWithPagination(page, size)
        );
    }
}