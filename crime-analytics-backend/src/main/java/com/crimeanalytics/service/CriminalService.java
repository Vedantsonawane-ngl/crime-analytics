package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.CriminalRequestDTO;
import com.crimeanalytics.dto.response.CriminalResponseDTO;

import java.util.List;

public interface CriminalService {

    CriminalResponseDTO createCriminal(CriminalRequestDTO requestDTO);

    List<CriminalResponseDTO> getAllCriminals();

    CriminalResponseDTO getCriminalById(Long id);

    CriminalResponseDTO updateCriminal(
            Long id,
            CriminalRequestDTO requestDTO
    );

    void deleteCriminal(Long id);
}