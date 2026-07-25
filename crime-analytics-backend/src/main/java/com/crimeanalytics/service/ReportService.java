package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.ReportRequest;
import com.crimeanalytics.dto.request.response.ReportResponse;

import java.util.List;

public interface ReportService {

    ReportResponse createReport(ReportRequest request);

    List<ReportResponse> getAllReports();

    ReportResponse getReportById(Long id);

    List<ReportResponse> getReportsByType(String reportType);

    List<ReportResponse> getReportsByGeneratedBy(String generatedBy);

    ReportResponse updateReport(Long id, ReportRequest request);

    void deleteReport(Long id);
}