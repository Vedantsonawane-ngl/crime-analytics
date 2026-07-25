package com.crimeanalytics.dto.request.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {

    private Long id;

    private String reportName;

    private String reportType;

    private String generatedBy;

    private LocalDateTime generatedAt;

    private String filePath;

    private String description;
}