package com.crimeanalytics.repository;

import com.crimeanalytics.entity.CriminalRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriminalRelationshipRepository extends JpaRepository<CriminalRelationship, Long> {
    List<CriminalRelationship> findBySourceCriminalIdOrTargetCriminalId(Long sourceId, Long targetId);
}
