package com.crimeanalytics.repository;

import com.crimeanalytics.entity.Criminal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CriminalRepository extends JpaRepository<Criminal, Long> {
}