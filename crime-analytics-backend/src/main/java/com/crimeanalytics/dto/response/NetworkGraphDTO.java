package com.crimeanalytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NetworkGraphDTO {

    private List<Node> nodes;
    private List<Link> links;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Node {
        private String id;
        private String label;
        private String type; // "CRIMINAL", "CRIME_RECORD", "LOCATION", "MODUS_OPERANDI"
        private String status;
        private Integer riskScore;
        private String details;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Link {
        private String source;
        private String target;
        private String relationship;
        private Integer weight;
    }
}
