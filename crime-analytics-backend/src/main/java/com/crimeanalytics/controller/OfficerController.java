package com.crimeanalytics.controller;

import com.crimeanalytics.dto.OfficerRequestDTO;
import com.crimeanalytics.dto.OfficerResponseDTO;
import com.crimeanalytics.service.OfficerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/officers")
@RequiredArgsConstructor
public class OfficerController {

    private final OfficerService officerService;

    @PostMapping
    public ResponseEntity<OfficerResponseDTO> createOfficer(
            @RequestBody OfficerRequestDTO requestDTO
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(officerService.createOfficer(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<OfficerResponseDTO>> getAllOfficers() {

        return ResponseEntity.ok(
                officerService.getAllOfficers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfficerResponseDTO> getOfficerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                officerService.getOfficerById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfficerResponseDTO> updateOfficer(
            @PathVariable Long id,
            @RequestBody OfficerRequestDTO requestDTO
    ) {

        return ResponseEntity.ok(
                officerService.updateOfficer(id, requestDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOfficer(
            @PathVariable Long id
    ) {

        officerService.deleteOfficer(id);

        return ResponseEntity.ok(
                "Officer deleted successfully"
        );
    }
}