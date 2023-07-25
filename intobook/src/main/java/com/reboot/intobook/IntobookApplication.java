package com.reboot.intobook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class IntobookApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntobookApplication.class, args);
    }

}
