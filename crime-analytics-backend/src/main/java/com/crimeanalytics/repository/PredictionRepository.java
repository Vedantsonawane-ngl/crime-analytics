package com.crimeanalytics.repository;

import com.crimeanalytics.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    List<Prediction> findByCityIgnoreCase(String city);

    List<Prediction> findByStateIgnoreCase(String state);

    List<Prediction> findByCrimeTypeIgnoreCase(String crimeType);

    List<Prediction> findByPredictedRiskIgnoreCase(String predictedRisk);
}