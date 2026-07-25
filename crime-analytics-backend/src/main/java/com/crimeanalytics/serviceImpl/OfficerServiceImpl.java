package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.OfficerRequestDTO;
import com.crimeanalytics.dto.OfficerResponseDTO;
import com.crimeanalytics.entity.Officer;
import com.crimeanalytics.repository.OfficerRepository;
import com.crimeanalytics.service.OfficerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfficerServiceImpl implements OfficerService {

    private final OfficerRepository officerRepository;

    @Override
    public OfficerResponseDTO createOfficer(OfficerRequestDTO requestDTO) {

        Officer officer = new Officer();

        officer.setBadgeNumber(requestDTO.getBadgeNumber());
        officer.setName(requestDTO.getName());
        officer.setDepartment(requestDTO.getDepartment());
        officer.setRank(requestDTO.getRank());
        officer.setPhoneNumber(requestDTO.getPhoneNumber());
        officer.setEmail(requestDTO.getEmail());

        Officer savedOfficer = officerRepository.save(officer);

        return convertToResponseDTO(savedOfficer);
    }

    @Override
    public OfficerResponseDTO getOfficerById(Long id) {

        Officer officer = officerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        return convertToResponseDTO(officer);
    }

    @Override
    public List<OfficerResponseDTO> getAllOfficers() {

        return officerRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    @Override
    public OfficerResponseDTO updateOfficer(
            Long id,
            OfficerRequestDTO requestDTO
    ) {

        Officer officer = officerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        officer.setBadgeNumber(requestDTO.getBadgeNumber());
        officer.setName(requestDTO.getName());
        officer.setDepartment(requestDTO.getDepartment());
        officer.setRank(requestDTO.getRank());
        officer.setPhoneNumber(requestDTO.getPhoneNumber());
        officer.setEmail(requestDTO.getEmail());

        Officer updatedOfficer = officerRepository.save(officer);

        return convertToResponseDTO(updatedOfficer);
    }

    @Override
    public void deleteOfficer(Long id) {

        if (!officerRepository.existsById(id)) {
            throw new RuntimeException("Officer not found");
        }

        officerRepository.deleteById(id);
    }

    private OfficerResponseDTO convertToResponseDTO(Officer officer) {

        return new OfficerResponseDTO(
                officer.getId(),
                officer.getBadgeNumber(),
                officer.getName(),
                officer.getDepartment(),
                officer.getRank(),
                officer.getPhoneNumber(),
                officer.getEmail()
        );
    }
}