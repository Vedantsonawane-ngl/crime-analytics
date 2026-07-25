package com.crimeanalytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnomalyAlertDTO {
    private String district;
    private String crimeType;
    private Long currentIncidentCount;
    private Double historicalAverage;
    private Double zScore;
    private String alertSeverity; // "CRITICAL_SPIKE", "HIGH_ANOMALY", "MODERATE_DEVIATION"
    private LocalDate detectedDate;
    private String description;
}
