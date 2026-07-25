package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.AIChatRequest;
import com.crimeanalytics.dto.request.response.AIChatResponse;

public interface AIService {

    AIChatResponse chat(AIChatRequest request);
}