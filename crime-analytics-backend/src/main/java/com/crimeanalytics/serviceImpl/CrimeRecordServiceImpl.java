package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.CrimeRecordRequest;
import com.crimeanalytics.entity.Crime;
import com.crimeanalytics.entity.CrimeRecord;
import com.crimeanalytics.repository.CrimeRecordRepository;
import com.crimeanalytics.repository.CrimeRepository;
import com.crimeanalytics.service.CrimeRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrimeRecordServiceImpl implements CrimeRecordService {

    private final CrimeRecordRepository crimeRecordRepository;
    private final CrimeRepository crimeRepository;

    @Override
    public List<CrimeRecord> getAllCrimeRecords() {

        return crimeRecordRepository.findAll();
    }

    @Override
    public List<CrimeRecord> getCrimeRecordsByCity(String city) {

        return crimeRecordRepository.findByCityIgnoreCase(city);
    }

    @Override
    public List<CrimeRecord> getCrimeRecordsByType(String crimeType) {

        return crimeRecordRepository.findByCrimeTypeIgnoreCase(crimeType);
    }

    @Override
    public List<CrimeRecord> getCrimeRecordsBySeverity(String severity) {

        return crimeRecordRepository.findBySeverityIgnoreCase(severity);
    }

    @Override
    public List<CrimeRecord> getCrimeRecordsByStatus(String status) {

        return crimeRecordRepository.findByStatusIgnoreCase(status);
    }

    @Override
    public void createCrimeRecord(CrimeRecordRequest request) {

        System.out.println("Received crimeId: " + request.getCrimeId());

        Crime crime = crimeRepository.findById(request.getCrimeId())
                .orElseThrow(() ->
                        new RuntimeException("Crime not found with id: " + request.getCrimeId())
                );

        System.out.println("Crime found: " + crime.getId());

        CrimeRecord crimeRecord = CrimeRecord.builder()
                .crime(crime)
                .crimeType(request.getCrimeType())
                .city(request.getCity())
                .state(request.getState())
                .location(request.getLocation())
                .crimeDate(request.getCrimeDate())
                .status(request.getStatus())
                .severity(request.getSeverity())
                .description(request.getDescription())
                .build();

        crimeRecordRepository.save(crimeRecord);
    }
}