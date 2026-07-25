package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.PredictionRequest;
import com.crimeanalytics.dto.request.response.PredictionResponse;
import com.crimeanalytics.entity.Crime;
import com.crimeanalytics.entity.Prediction;
import com.crimeanalytics.repository.CrimeRepository;
import com.crimeanalytics.repository.PredictionRepository;
import com.crimeanalytics.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PredictionServiceImpl implements PredictionService {

    private final PredictionRepository predictionRepository;
    private final CrimeRepository crimeRepository;

    @Override
    public PredictionResponse createPrediction(PredictionRequest request) {

        Crime crime = crimeRepository.findById(request.getCrimeId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Crime not found with id: " + request.getCrimeId()
                        )
                );

        Prediction prediction = Prediction.builder()
                .crime(crime)
                .crimeType(request.getCrimeType())
                .city(request.getCity())
                .state(request.getState())
                .predictedRisk(request.getPredictedRisk())
                .confidenceScore(request.getConfidenceScore())
                .predictionDate(request.getPredictionDate())
                .description(request.getDescription())
                .build();

        return mapToResponse(
                predictionRepository.save(prediction)
        );
    }

    @Override
    public List<PredictionResponse> getAllPredictions() {

        return predictionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PredictionResponse getPredictionById(Long id) {

        Prediction prediction = predictionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prediction not found with id: " + id
                        )
                );

        return mapToResponse(prediction);
    }

    @Override
    public List<PredictionResponse> getPredictionsByCity(String city) {

        return predictionRepository.findByCityIgnoreCase(city)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<PredictionResponse> getPredictionsByState(String state) {

        return predictionRepository.findByStateIgnoreCase(state)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<PredictionResponse> getPredictionsByCrimeType(
            String crimeType
    ) {

        return predictionRepository.findByCrimeTypeIgnoreCase(crimeType)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<PredictionResponse> getPredictionsByRisk(
            String predictedRisk
    ) {

        return predictionRepository
                .findByPredictedRiskIgnoreCase(predictedRisk)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PredictionResponse updatePrediction(
            Long id,
            PredictionRequest request
    ) {

        Prediction prediction = predictionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prediction not found with id: " + id
                        )
                );

        Crime crime = crimeRepository.findById(request.getCrimeId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Crime not found with id: " + request.getCrimeId()
                        )
                );

        prediction.setCrime(crime);
        prediction.setCrimeType(request.getCrimeType());
        prediction.setCity(request.getCity());
        prediction.setState(request.getState());
        prediction.setPredictedRisk(request.getPredictedRisk());
        prediction.setConfidenceScore(request.getConfidenceScore());
        prediction.setPredictionDate(request.getPredictionDate());
        prediction.setDescription(request.getDescription());

        return mapToResponse(
                predictionRepository.save(prediction)
        );
    }

    @Override
    public void deletePrediction(Long id) {

        if (!predictionRepository.existsById(id)) {

            throw new RuntimeException(
                    "Prediction not found with id: " + id
            );
        }

        predictionRepository.deleteById(id);
    }

    private PredictionResponse mapToResponse(
            Prediction prediction
    ) {

        return PredictionResponse.builder()
                .id(prediction.getId())
                .crimeId(
                        prediction.getCrime() != null
                                ? prediction.getCrime().getId()
                                : null
                )
                .crimeType(prediction.getCrimeType())
                .city(prediction.getCity())
                .state(prediction.getState())
                .predictedRisk(prediction.getPredictedRisk())
                .confidenceScore(prediction.getConfidenceScore())
                .predictionDate(prediction.getPredictionDate())
                .description(prediction.getDescription())
                .build();
    }
}