package com.crimeanalytics.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "crimes")
public class Crime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crimeName;

    private String description;

    private String category;

    private String severity;

    public Crime() {
    }

    public Crime(String crimeName, String description,
                 String category, String severity) {
        this.crimeName = crimeName;
        this.description = description;
        this.category = category;
        this.severity = severity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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