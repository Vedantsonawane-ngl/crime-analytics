package com.crimeanalytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocioEconomicCorrelationDTO {
    private String district;
    private Long totalCrimes;
    private Double unemploymentRate;
    private Double povertyRate;
    private Double literacyRate;
    private Double urbanizationIndex;
    private Double riskCorrelationIndex;
    private String primaryVulnerability;
}
