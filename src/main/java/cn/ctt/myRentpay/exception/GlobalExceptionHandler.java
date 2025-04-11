package cn.ctt.myRentpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    // 全局异常处理
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("服务器内部错误"+ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 针对特定异常的处理，比如 IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>("请求参数错误", HttpStatus.BAD_REQUEST);
    }
}
