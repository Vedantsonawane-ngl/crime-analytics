package com.crimeanalytics.repository;

import com.crimeanalytics.entity.SocioEconomicData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocioEconomicDataRepository extends JpaRepository<SocioEconomicData, Long> {
    Optional<SocioEconomicData> findByDistrictIgnoreCase(String district);
}
