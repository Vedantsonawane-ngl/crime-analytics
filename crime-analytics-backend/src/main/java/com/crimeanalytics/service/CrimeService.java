package com.crimeanalytics.service;

import com.crimeanalytics.dto.CrimeRequestDTO;
import com.crimeanalytics.dto.CrimeResponseDTO;

import java.util.List;

public interface CrimeService {

    CrimeResponseDTO createCrime(CrimeRequestDTO requestDTO);

    CrimeResponseDTO getCrimeById(Long id);

    List<CrimeResponseDTO> getAllCrimes();

    CrimeResponseDTO updateCrime(Long id, CrimeRequestDTO requestDTO);

    void deleteCrime(Long id);
}