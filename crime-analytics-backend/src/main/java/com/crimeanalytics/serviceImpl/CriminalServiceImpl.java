package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.CriminalRequestDTO;
import com.crimeanalytics.dto.response.CriminalResponseDTO;
import com.crimeanalytics.entity.Criminal;
import com.crimeanalytics.repository.CriminalRepository;
import com.crimeanalytics.service.CriminalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CriminalServiceImpl implements CriminalService {

    private final CriminalRepository criminalRepository;

    @Override
    public CriminalResponseDTO createCriminal(
            CriminalRequestDTO requestDTO
    ) {

        Criminal criminal = Criminal.builder()
                .name(requestDTO.getName())
                .alias(requestDTO.getAlias())
                .gender(requestDTO.getGender())
                .age(requestDTO.getAge())
                .address(requestDTO.getAddress())
                .phoneNumber(requestDTO.getPhoneNumber())
                .criminalStatus(requestDTO.getCriminalStatus())
                .description(requestDTO.getDescription())
                .build();

        Criminal savedCriminal = criminalRepository.save(criminal);

        return mapToResponse(savedCriminal);
    }

    @Override
    public List<CriminalResponseDTO> getAllCriminals() {

        return criminalRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CriminalResponseDTO getCriminalById(Long id) {

        Criminal criminal = criminalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Criminal not found with id: " + id
                        )
                );

        return mapToResponse(criminal);
    }

    @Override
    public CriminalResponseDTO updateCriminal(
            Long id,
            CriminalRequestDTO requestDTO
    ) {

        Criminal criminal = criminalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Criminal not found with id: " + id
                        )
                );

        criminal.setName(requestDTO.getName());
        criminal.setAlias(requestDTO.getAlias());
        criminal.setGender(requestDTO.getGender());
        criminal.setAge(requestDTO.getAge());
        criminal.setAddress(requestDTO.getAddress());
        criminal.setPhoneNumber(requestDTO.getPhoneNumber());
        criminal.setCriminalStatus(requestDTO.getCriminalStatus());
        criminal.setDescription(requestDTO.getDescription());

        Criminal updatedCriminal =
                criminalRepository.save(criminal);

        return mapToResponse(updatedCriminal);
    }

    @Override
    public void deleteCriminal(Long id) {

        if (!criminalRepository.existsById(id)) {

            throw new RuntimeException(
                    "Criminal not found with id: " + id
            );
        }

        criminalRepository.deleteById(id);
    }

    private CriminalResponseDTO mapToResponse(
            Criminal criminal
    ) {

        return CriminalResponseDTO.builder()
                .id(criminal.getId())
                .name(criminal.getName())
                .alias(criminal.getAlias())
                .gender(criminal.getGender())
                .age(criminal.getAge())
                .address(criminal.getAddress())
                .phoneNumber(criminal.getPhoneNumber())
                .criminalStatus(criminal.getCriminalStatus())
                .description(criminal.getDescription())
                .build();
    }
}