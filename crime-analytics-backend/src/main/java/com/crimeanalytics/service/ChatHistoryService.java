package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.ChatHistoryRequest;
import com.crimeanalytics.dto.request.response.ChatHistoryResponse;

import java.util.List;

public interface ChatHistoryService {

    ChatHistoryResponse createChatHistory(
            ChatHistoryRequest request
    );

    List<ChatHistoryResponse> getAllChatHistory();

    ChatHistoryResponse getChatHistoryById(Long id);

    List<ChatHistoryResponse> getChatHistoryByUserId(
            Long userId
    );

    ChatHistoryResponse updateChatHistory(
            Long id,
            ChatHistoryRequest request
    );

    void deleteChatHistory(Long id);
}