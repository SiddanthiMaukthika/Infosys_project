package com.example;



import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;



@SpringBootApplication

public class EmergencyAndMentalWellBeingProjectApplication {



    public static void main(String[] args) {

        SpringApplication.run(EmergencyAndMentalWellBeingProjectApplication.class, args);

    }



}



@RestController

@RequestMapping("/")

class Hello{
    @GetMapping
    public String hello(){
        return "Hello, Mahi!!";
    }
}