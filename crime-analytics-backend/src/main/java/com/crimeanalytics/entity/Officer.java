package com.crimeanalytics.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "officers")
public class Officer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String badgeNumber;

    private String name;

    private String department;

    private String rank;

    private String phoneNumber;

    private String email;

    // Default constructor
    public Officer() {
    }

    // Parameterized constructor
    public Officer(String badgeNumber, String name, String department,
                   String rank, String phoneNumber, String email) {
        this.badgeNumber = badgeNumber;
        this.name = name;
        this.department = department;
        this.rank = rank;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBadgeNumber() {
        return badgeNumber;
    }

    public void setBadgeNumber(String badgeNumber) {
        this.badgeNumber = badgeNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}