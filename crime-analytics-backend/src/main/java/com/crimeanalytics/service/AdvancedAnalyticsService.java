package com.crimeanalytics.service;

import com.crimeanalytics.dto.response.AnomalyAlertDTO;
import com.crimeanalytics.dto.response.NetworkGraphDTO;
import com.crimeanalytics.dto.response.SocioEconomicCorrelationDTO;
import com.crimeanalytics.entity.CrimeRecord;

import java.util.List;

public interface AdvancedAnalyticsService {
    NetworkGraphDTO getCriminalNetworkGraph();
    List<AnomalyAlertDTO> getDetectedAnomalies();
    List<SocioEconomicCorrelationDTO> getSocioEconomicCorrelations();
    List<CrimeRecord> getGeospatialRecords(String district);
}
