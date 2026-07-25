package com.crimeanalytics.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriminalRequestDTO {

    private String name;

    private String alias;

    private String gender;

    private Integer age;

    private String address;

    private String phoneNumber;

    private String criminalStatus;

    private String description;
}