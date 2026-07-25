package com.crimeanalytics.dto.request.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatHistoryResponse {

    private Long id;

    private String userMessage;

    private String aiResponse;

    private LocalDateTime timestamp;

    private Long userId;
}