package com.crimeanalytics.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "predictions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crimeType;

    private String city;

    private String state;

    private String predictedRisk;

    private Double confidenceScore;

    private LocalDateTime predictionDate;

    private String description;

    @ManyToOne
    @JoinColumn(name = "crime_id")
    private Crime crime;
}