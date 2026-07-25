package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.ReportRequest;
import com.crimeanalytics.dto.request.response.ReportResponse;
import com.crimeanalytics.entity.Report;
import com.crimeanalytics.repository.ReportRepository;
import com.crimeanalytics.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public ReportResponse createReport(ReportRequest request) {

        Report report = Report.builder()
                .reportName(request.getReportName())
                .reportType(request.getReportType())
                .generatedBy(request.getGeneratedBy())
                .generatedAt(request.getGeneratedAt())
                .filePath(request.getFilePath())
                .description(request.getDescription())
                .build();

        return mapToResponse(
                reportRepository.save(report)
        );
    }

    @Override
    public List<ReportResponse> getAllReports() {

        return reportRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ReportResponse getReportById(Long id) {

        Report report = reportRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Report not found with id: " + id
                        )
                );

        return mapToResponse(report);
    }

    @Override
    public List<ReportResponse> getReportsByType(String reportType) {

        return reportRepository.findByReportTypeIgnoreCase(reportType)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ReportResponse> getReportsByGeneratedBy(
            String generatedBy
    ) {

        return reportRepository.findByGeneratedByIgnoreCase(generatedBy)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ReportResponse updateReport(
            Long id,
            ReportRequest request
    ) {

        Report report = reportRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Report not found with id: " + id
                        )
                );

        report.setReportName(request.getReportName());
        report.setReportType(request.getReportType());
        report.setGeneratedBy(request.getGeneratedBy());
        report.setGeneratedAt(request.getGeneratedAt());
        report.setFilePath(request.getFilePath());
        report.setDescription(request.getDescription());

        return mapToResponse(
                reportRepository.save(report)
        );
    }

    @Override
    public void deleteReport(Long id) {

        if (!reportRepository.existsById(id)) {

            throw new RuntimeException(
                    "Report not found with id: " + id
            );
        }

        reportRepository.deleteById(id);
    }

    private ReportResponse mapToResponse(Report report) {

        return ReportResponse.builder()
                .id(report.getId())
                .reportName(report.getReportName())
                .reportType(report.getReportType())
                .generatedBy(report.getGeneratedBy())
                .generatedAt(report.getGeneratedAt())
                .filePath(report.getFilePath())
                .description(report.getDescription())
                .build();
    }
}