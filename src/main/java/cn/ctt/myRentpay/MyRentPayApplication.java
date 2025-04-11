package cn.ctt.myRentpay;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("cn.ctt.myRentPay.mapper")
public class MyRentPayApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyRentPayApplication.class, args);
    }

}
