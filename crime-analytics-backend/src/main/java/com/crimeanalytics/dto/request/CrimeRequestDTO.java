package com.crimeanalytics.dto;

public class CrimeRequestDTO {

    private String crimeName;

    private String description;

    private String category;

    private String severity;

    public CrimeRequestDTO() {
    }

    public CrimeRequestDTO(String crimeName, String description,
                           String category, String severity) {
        this.crimeName = crimeName;
        this.description = description;
        this.category = category;
        this.severity = severity;
    }

    public String getCrimeName() {
        return crimeName;
    }

    public void setCrimeName(String crimeName) {
        this.crimeName = crimeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}