package com.flight.passengerdetails;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class PassengerDetailsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PassengerDetailsApplication.class, args);
	}

}
