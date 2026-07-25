package com.crimeanalytics.controller;

import com.crimeanalytics.dto.request.PredictionRequest;
import com.crimeanalytics.dto.request.response.PredictionResponse;
import com.crimeanalytics.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping
    public ResponseEntity<PredictionResponse> createPrediction(
            @Valid @RequestBody PredictionRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        predictionService.createPrediction(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<PredictionResponse>> getAllPredictions() {

        return ResponseEntity.ok(
                predictionService.getAllPredictions()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredictionResponse> getPredictionById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                predictionService.getPredictionById(id)
        );
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<PredictionResponse>> getByCity(
            @PathVariable String city
    ) {

        return ResponseEntity.ok(
                predictionService.getPredictionsByCity(city)
        );
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<PredictionResponse>> getByState(
            @PathVariable String state
    ) {

        return ResponseEntity.ok(
                predictionService.getPredictionsByState(state)
        );
    }

    @GetMapping("/type/{crimeType}")
    public ResponseEntity<List<PredictionResponse>> getByCrimeType(
            @PathVariable String crimeType
    ) {

        return ResponseEntity.ok(
                predictionService.getPredictionsByCrimeType(crimeType)
        );
    }

    @GetMapping("/risk/{predictedRisk}")
    public ResponseEntity<List<PredictionResponse>> getByRisk(
            @PathVariable String predictedRisk
    ) {

        return ResponseEntity.ok(
                predictionService.getPredictionsByRisk(predictedRisk)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<PredictionResponse> updatePrediction(
            @PathVariable Long id,
            @Valid @RequestBody PredictionRequest request
    ) {

        return ResponseEntity.ok(
                predictionService.updatePrediction(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrediction(
            @PathVariable Long id
    ) {

        predictionService.deletePrediction(id);

        return ResponseEntity.ok(
                "Prediction deleted successfully"
        );
    }
}