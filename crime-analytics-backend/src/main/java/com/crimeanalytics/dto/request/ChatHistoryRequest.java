package com.crimeanalytics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatHistoryRequest {

    @NotBlank(message = "User message is required")
    private String userMessage;

    @NotBlank(message = "AI response is required")
    private String aiResponse;

    @NotNull(message = "Timestamp is required")
    private LocalDateTime timestamp;

    @NotNull(message = "User ID is required")
    private Long userId;
}