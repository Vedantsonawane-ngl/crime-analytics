package com.crimeanalytics.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "socio_economic_data")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocioEconomicData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String district;

    private Double unemploymentRate;

    private Double povertyRate;

    private Double literacyRate;

    private Double urbanizationIndex;

    private Long populationDensity;

    private Double averageIncomeInr;
}
