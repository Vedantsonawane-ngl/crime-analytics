package com.crimeanalytics.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "criminals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Criminal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String alias;

    private String gender;

    private Integer age;

    private String address;

    private String phoneNumber;

    private String criminalStatus;

    private String description;
}