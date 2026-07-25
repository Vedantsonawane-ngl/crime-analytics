package com.crimeanalytics.repository;

import com.crimeanalytics.entity.CrimeRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrimeRecordRepository
        extends JpaRepository<CrimeRecord, Long> {

    List<CrimeRecord> findByCityIgnoreCase(String city);

    List<CrimeRecord> findByCrimeTypeIgnoreCase(String crimeType);

    List<CrimeRecord> findBySeverityIgnoreCase(String severity);

    List<CrimeRecord> findByStatusIgnoreCase(String status);
}