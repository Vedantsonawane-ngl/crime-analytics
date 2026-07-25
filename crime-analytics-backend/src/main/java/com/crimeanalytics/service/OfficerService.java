package com.crimeanalytics.service;

import com.crimeanalytics.dto.OfficerRequestDTO;
import com.crimeanalytics.dto.OfficerResponseDTO;

import java.util.List;

public interface OfficerService {

    OfficerResponseDTO createOfficer(OfficerRequestDTO requestDTO);

    OfficerResponseDTO getOfficerById(Long id);

    List<OfficerResponseDTO> getAllOfficers();

    OfficerResponseDTO updateOfficer(Long id, OfficerRequestDTO requestDTO);

    void deleteOfficer(Long id);
}