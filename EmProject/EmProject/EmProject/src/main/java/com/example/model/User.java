package com.example.model;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
 
@Document(collection="Products")
 
public class User{
   
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    @Id
    private String id;
    private String name;
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    private String email;
    public User(){
 
    }
}