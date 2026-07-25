package com.crimeanalytics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CriminalResponseDTO {

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