package com.crimeanalytics.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "criminal_relationships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CriminalRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_criminal_id", nullable = false)
    private Criminal sourceCriminal;

    @ManyToOne
    @JoinColumn(name = "target_criminal_id", nullable = false)
    private Criminal targetCriminal;

    private String relationshipType; // e.g. "CO_SUSPECT", "GANG_MEMBER", "HANDLER", "FINANCIER"

    private Integer sharedIncidentCount;

    private String modusOperandi;

    private String sharedLocation;
}
