package com.crimeanalytics.controller;

import com.crimeanalytics.dto.CrimeRequestDTO;
import com.crimeanalytics.dto.CrimeResponseDTO;
import com.crimeanalytics.service.CrimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crimes")
@RequiredArgsConstructor
public class CrimeController {

    private final CrimeService crimeService;

    @PostMapping
    public ResponseEntity<CrimeResponseDTO> createCrime(
            @RequestBody CrimeRequestDTO requestDTO
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(crimeService.createCrime(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<CrimeResponseDTO>> getAllCrimes() {

        return ResponseEntity.ok(
                crimeService.getAllCrimes()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CrimeResponseDTO> getCrimeById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                crimeService.getCrimeById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CrimeResponseDTO> updateCrime(
            @PathVariable Long id,
            @RequestBody CrimeRequestDTO requestDTO
    ) {

        return ResponseEntity.ok(
                crimeService.updateCrime(id, requestDTO)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCrime(
            @PathVariable Long id
    ) {

        crimeService.deleteCrime(id);

        return ResponseEntity.ok(
                "Crime deleted successfully"
        );
    }
}