package com.crimeanalytics.controller;

import com.crimeanalytics.dto.response.AnomalyAlertDTO;
import com.crimeanalytics.dto.response.NetworkGraphDTO;
import com.crimeanalytics.dto.response.SocioEconomicCorrelationDTO;
import com.crimeanalytics.entity.CrimeRecord;
import com.crimeanalytics.service.AdvancedAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics/advanced")
@RequiredArgsConstructor
public class AdvancedAnalyticsController {

    private final AdvancedAnalyticsService advancedAnalyticsService;

    @GetMapping("/network-graph")
    public ResponseEntity<NetworkGraphDTO> getNetworkGraph() {
        return ResponseEntity.ok(advancedAnalyticsService.getCriminalNetworkGraph());
    }

    @GetMapping("/anomalies")
    public ResponseEntity<List<AnomalyAlertDTO>> getAnomalies() {
        return ResponseEntity.ok(advancedAnalyticsService.getDetectedAnomalies());
    }

    @GetMapping("/socio-economic")
    public ResponseEntity<List<SocioEconomicCorrelationDTO>> getSocioEconomicCorrelations() {
        return ResponseEntity.ok(advancedAnalyticsService.getSocioEconomicCorrelations());
    }

    @GetMapping("/geospatial")
    public ResponseEntity<List<CrimeRecord>> getGeospatialRecords(
            @RequestParam(required = false, defaultValue = "ALL") String district
    ) {
        return ResponseEntity.ok(advancedAnalyticsService.getGeospatialRecords(district));
    }
}
