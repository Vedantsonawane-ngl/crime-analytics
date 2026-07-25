package com.crimeanalytics.controller;

import com.crimeanalytics.dto.request.ReportRequest;
import com.crimeanalytics.dto.request.response.ReportResponse;
import com.crimeanalytics.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportResponse> createReport(
            @Valid @RequestBody ReportRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        reportService.createReport(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getAllReports() {

        return ResponseEntity.ok(
                reportService.getAllReports()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportResponse> getReportById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                reportService.getReportById(id)
        );
    }

    @GetMapping("/type/{reportType}")
    public ResponseEntity<List<ReportResponse>> getByType(
            @PathVariable String reportType
    ) {

        return ResponseEntity.ok(
                reportService.getReportsByType(reportType)
        );
    }

    @GetMapping("/generated-by/{generatedBy}")
    public ResponseEntity<List<ReportResponse>> getByGeneratedBy(
            @PathVariable String generatedBy
    ) {

        return ResponseEntity.ok(
                reportService.getReportsByGeneratedBy(generatedBy)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportResponse> updateReport(
            @PathVariable Long id,
            @Valid @RequestBody ReportRequest request
    ) {

        return ResponseEntity.ok(
                reportService.updateReport(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReport(
            @PathVariable Long id
    ) {

        reportService.deleteReport(id);

        return ResponseEntity.ok(
                "Report deleted successfully"
        );
    }
}