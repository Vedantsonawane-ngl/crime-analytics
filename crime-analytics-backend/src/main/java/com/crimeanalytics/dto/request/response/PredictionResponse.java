package com.crimeanalytics.dto.request.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponse {

    private Long id;

    private Long crimeId;

    private String crimeType;

    private String city;

    private String state;

    private String predictedRisk;

    private Double confidenceScore;

    private LocalDateTime predictionDate;

    private String description;
}