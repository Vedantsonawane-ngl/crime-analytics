package com.crimeanalytics.controller;

import com.crimeanalytics.dto.request.CrimeRecordRequest;
import com.crimeanalytics.entity.CrimeRecord;
import com.crimeanalytics.service.CrimeRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crime-records")
@RequiredArgsConstructor
public class CrimeRecordController {

    private final CrimeRecordService crimeRecordService;

    @PostMapping
    public ResponseEntity<String> createCrimeRecord(
            @Valid @RequestBody CrimeRecordRequest request
    ) {
        System.out.println("========== CRIME RECORD REQUEST RECEIVED ==========");
        System.out.println("Crime ID: " + request.getCrimeId());

        crimeRecordService.createCrimeRecord(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Crime record created successfully");
    }

    @GetMapping
    public ResponseEntity<List<CrimeRecord>> getAllCrimeRecords() {

        return ResponseEntity.ok(
                crimeRecordService.getAllCrimeRecords()
        );
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<CrimeRecord>> getByCity(
            @PathVariable String city
    ) {
        return ResponseEntity.ok(
                crimeRecordService.getCrimeRecordsByCity(city)
        );
    }

    @GetMapping("/type/{crimeType}")
    public ResponseEntity<List<CrimeRecord>> getByType(
            @PathVariable String crimeType
    ) {
        return ResponseEntity.ok(
                crimeRecordService.getCrimeRecordsByType(crimeType)
        );
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<CrimeRecord>> getBySeverity(
            @PathVariable String severity
    ) {
        return ResponseEntity.ok(
                crimeRecordService.getCrimeRecordsBySeverity(severity)
        );
    }


    @GetMapping("/status/{status}")
    public ResponseEntity<List<CrimeRecord>> getByStatus(
            @PathVariable String status
    ) {
        return ResponseEntity.ok(
                crimeRecordService.getCrimeRecordsByStatus(status)
        );
    }



}