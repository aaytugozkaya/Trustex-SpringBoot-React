package com.example.trustex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.trustex.dao")
@EnableScheduling
public class TrustexApplication{

	public static void main(String[] args) {
		SpringApplication.run(TrustexApplication.class, args);
	}

}
