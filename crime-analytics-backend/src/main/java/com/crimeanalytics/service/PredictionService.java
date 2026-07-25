package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.PredictionRequest;
import com.crimeanalytics.dto.request.response.PredictionResponse;

import java.util.List;

public interface PredictionService {

    PredictionResponse createPrediction(PredictionRequest request);

    List<PredictionResponse> getAllPredictions();

    PredictionResponse getPredictionById(Long id);

    List<PredictionResponse> getPredictionsByCity(String city);

    List<PredictionResponse> getPredictionsByState(String state);

    List<PredictionResponse> getPredictionsByCrimeType(String crimeType);

    List<PredictionResponse> getPredictionsByRisk(String predictedRisk);

    PredictionResponse updatePrediction(Long id, PredictionRequest request);

    void deletePrediction(Long id);
}