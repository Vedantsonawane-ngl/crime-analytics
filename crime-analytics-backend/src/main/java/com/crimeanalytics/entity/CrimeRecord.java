package com.crimeanalytics.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import java.time.LocalDate;

@Entity
@Table(name = "crime_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrimeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crimeType;

    private String city;

    private String state;

    private String location;

    private LocalDate crimeDate;

    private String status;

    private String severity;

    private String description;

    private Double latitude;

    private Double longitude;

    private String district;

    private String policeStation;

    private String timeOfDay;

    private String modusOperandi;

    private Boolean anomalyFlag;

    private Integer riskScore;

    @ManyToOne
    @JoinColumn(name = "crime_id", nullable = false)
    private Crime crime;

    public Crime getCrime() {
        return crime;
    }

    public void setCrime(Crime crime) {
        this.crime = crime;
    }
}