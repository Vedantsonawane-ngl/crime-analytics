package com.crimeanalytics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PredictionRequest {

    @NotNull(message = "Crime ID is required")
    private Long crimeId;

    @NotBlank(message = "Crime type is required")
    private String crimeType;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Predicted risk is required")
    private String predictedRisk;

    @NotNull(message = "Confidence score is required")
    private Double confidenceScore;

    @NotNull(message = "Prediction date is required")
    private LocalDateTime predictionDate;

    private String description;
}