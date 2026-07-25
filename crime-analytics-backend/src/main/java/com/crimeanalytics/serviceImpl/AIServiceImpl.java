package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.AIChatRequest;
import com.crimeanalytics.dto.request.response.AIChatResponse;
import com.crimeanalytics.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Override
    public AIChatResponse chat(AIChatRequest request) {

        try {

            String escapedMessage = request.getMessage()
                    .replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r");

            String requestBody = """
                    {
                      "model": "gpt-4o-mini",
                      "messages": [
                        {
                          "role": "system",
                          "content": "You are an AI Crime Analytics Assistant. Analyze crime-related questions clearly and provide concise, factual answers. Do not invent crime statistics."
                        },
                        {
                          "role": "user",
                          "content": "%s"
                        }
                      ]
                    }
                    """.formatted(escapedMessage);

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(
                            HttpRequest.BodyPublishers
                                    .ofString(requestBody)
                    )
                    .build();

            HttpResponse<String> response =
                    client.send(
                            httpRequest,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200 ||
                    response.statusCode() >= 300) {

                throw new RuntimeException(
                        "AI API Error: "
                                + response.statusCode()
                                + " - "
                                + response.body()
                );
            }

            String aiResponse = extractAIResponse(
                    response.body()
            );

            return AIChatResponse.builder()
                    .message(request.getMessage())
                    .response(aiResponse)
                    .build();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to communicate with AI service",
                    e
            );
        }
    }

    private String extractAIResponse(
            String response
    ) {

        String searchText = "\"content\":\"";

        int startIndex =
                response.indexOf(searchText);

        if (startIndex == -1) {

            return response;
        }

        startIndex += searchText.length();

        int endIndex =
                response.indexOf(
                        "\"",
                        startIndex
                );

        if (endIndex == -1) {

            return response.substring(startIndex);
        }

        return response.substring(
                startIndex,
                endIndex
        );
    }
}