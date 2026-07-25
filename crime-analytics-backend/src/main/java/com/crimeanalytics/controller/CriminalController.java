package com.crimeanalytics.controller;

import com.crimeanalytics.dto.request.CriminalRequestDTO;
import com.crimeanalytics.dto.response.CriminalResponseDTO;
import com.crimeanalytics.service.CriminalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/criminals")
@RequiredArgsConstructor
public class CriminalController {

    private final CriminalService criminalService;

    @PostMapping
    public ResponseEntity<CriminalResponseDTO> createCriminal(
            @RequestBody CriminalRequestDTO requestDTO
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(criminalService.createCriminal(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<CriminalResponseDTO>> getAllCriminals() {

        return ResponseEntity.ok(
                criminalService.getAllCriminals()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriminalResponseDTO> getCriminalById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                criminalService.getCriminalById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CriminalResponseDTO> updateCriminal(
            @PathVariable Long id,
            @RequestBody CriminalRequestDTO requestDTO
    ) {

        return ResponseEntity.ok(
                criminalService.updateCriminal(id, requestDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCriminal(
            @PathVariable Long id
    ) {

        criminalService.deleteCriminal(id);

        return ResponseEntity.ok(
                "Criminal deleted successfully"
        );
    }
}