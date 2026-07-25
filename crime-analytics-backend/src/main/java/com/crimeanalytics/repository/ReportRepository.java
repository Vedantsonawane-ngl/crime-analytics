package com.crimeanalytics.repository;

import com.crimeanalytics.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByReportTypeIgnoreCase(String reportType);

    List<Report> findByGeneratedByIgnoreCase(String generatedBy);
}