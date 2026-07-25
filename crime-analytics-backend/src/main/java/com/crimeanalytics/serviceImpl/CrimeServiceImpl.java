package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.CrimeRequestDTO;
import com.crimeanalytics.dto.CrimeResponseDTO;
import com.crimeanalytics.entity.Crime;
import com.crimeanalytics.repository.CrimeRepository;
import com.crimeanalytics.service.CrimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrimeServiceImpl implements CrimeService {

    private final CrimeRepository crimeRepository;

    @Override
    public CrimeResponseDTO createCrime(CrimeRequestDTO requestDTO) {

        Crime crime = new Crime();

        crime.setCrimeName(requestDTO.getCrimeName());
        crime.setDescription(requestDTO.getDescription());
        crime.setCategory(requestDTO.getCategory());
        crime.setSeverity(requestDTO.getSeverity());

        Crime savedCrime = crimeRepository.save(crime);

        return convertToResponseDTO(savedCrime);
    }

    @Override
    public CrimeResponseDTO getCrimeById(Long id) {

        Crime crime = crimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        return convertToResponseDTO(crime);
    }

    @Override
    public List<CrimeResponseDTO> getAllCrimes() {

        return crimeRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    @Override
    public CrimeResponseDTO updateCrime(
            Long id,
            CrimeRequestDTO requestDTO
    ) {

        Crime crime = crimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        crime.setCrimeName(requestDTO.getCrimeName());
        crime.setDescription(requestDTO.getDescription());
        crime.setCategory(requestDTO.getCategory());
        crime.setSeverity(requestDTO.getSeverity());

        Crime updatedCrime = crimeRepository.save(crime);

        return convertToResponseDTO(updatedCrime);
    }

    @Override
    public void deleteCrime(Long id) {

        if (!crimeRepository.existsById(id)) {
            throw new RuntimeException("Crime not found");
        }

        crimeRepository.deleteById(id);
    }

    private CrimeResponseDTO convertToResponseDTO(Crime crime) {

        return new CrimeResponseDTO(
                crime.getId(),
                crime.getCrimeName(),
                crime.getDescription(),
                crime.getCategory(),
                crime.getSeverity()
        );
    }
}