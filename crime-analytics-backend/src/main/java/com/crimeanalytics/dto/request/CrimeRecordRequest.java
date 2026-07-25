package com.crimeanalytics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CrimeRecordRequest {

    private Long crimeId;

    @NotBlank(message = "Crime type is required")
    private String crimeType;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Crime date is required")
    private LocalDate crimeDate;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Severity is required")
    private String severity;

    private String description;

    public Long getCrimeId() {
        return crimeId;
    }

    public void setCrimeId(Long crimeId) {
        this.crimeId = crimeId;
    }
}