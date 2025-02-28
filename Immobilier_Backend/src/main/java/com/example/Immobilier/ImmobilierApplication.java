package com.example.Immobilier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAspectJAutoProxy
@SpringBootApplication
@EnableScheduling
public class ImmobilierApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImmobilierApplication.class, args);
    }

}
