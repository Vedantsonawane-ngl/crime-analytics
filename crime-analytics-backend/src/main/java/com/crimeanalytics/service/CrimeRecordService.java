package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.CrimeRecordRequest;

import com.crimeanalytics.entity.CrimeRecord;

import java.util.List;

public interface CrimeRecordService {

    void createCrimeRecord(CrimeRecordRequest request);

    List<CrimeRecord> getAllCrimeRecords();

    List<CrimeRecord> getCrimeRecordsByCity(String city);

    List<CrimeRecord> getCrimeRecordsByType(String crimeType);

    List<CrimeRecord> getCrimeRecordsBySeverity(String severity);

    List<CrimeRecord> getCrimeRecordsByStatus(String status);

}