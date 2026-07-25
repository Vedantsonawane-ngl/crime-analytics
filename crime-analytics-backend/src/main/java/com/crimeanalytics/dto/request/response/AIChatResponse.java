package com.crimeanalytics.dto.request.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIChatResponse {

    private String message;

    private String response;
}