package com.crimeanalytics.repository;

import com.crimeanalytics.entity.Crime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrimeRepository extends JpaRepository<Crime, Long> {

    Optional<Crime> findByCrimeName(String crimeName);
}