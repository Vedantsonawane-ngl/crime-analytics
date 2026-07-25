package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.ChatHistoryRequest;
import com.crimeanalytics.dto.request.response.ChatHistoryResponse;
import com.crimeanalytics.entity.ChatHistory;
import com.crimeanalytics.entity.User;
import com.crimeanalytics.repository.ChatHistoryRepository;
import com.crimeanalytics.repository.UserRepository;
import com.crimeanalytics.service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatHistoryServiceImpl
        implements ChatHistoryService {

    private final ChatHistoryRepository chatHistoryRepository;

    private final UserRepository userRepository;

    @Override
    public ChatHistoryResponse createChatHistory(
            ChatHistoryRequest request
    ) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: "
                                        + request.getUserId()
                        )
                );

        ChatHistory chatHistory = ChatHistory.builder()
                .userMessage(request.getUserMessage())
                .aiResponse(request.getAiResponse())
                .timestamp(request.getTimestamp())
                .user(user)
                .build();

        return mapToResponse(
                chatHistoryRepository.save(chatHistory)
        );
    }

    @Override
    public List<ChatHistoryResponse> getAllChatHistory() {

        return chatHistoryRepository
                .findAllByOrderByTimestampDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ChatHistoryResponse getChatHistoryById(
            Long id
    ) {

        ChatHistory chatHistory =
                chatHistoryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Chat history not found with id: "
                                                + id
                                )
                        );

        return mapToResponse(chatHistory);
    }

    @Override
    public List<ChatHistoryResponse> getChatHistoryByUserId(
            Long userId
    ) {

        return chatHistoryRepository
                .findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ChatHistoryResponse updateChatHistory(
            Long id,
            ChatHistoryRequest request
    ) {

        ChatHistory chatHistory =
                chatHistoryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Chat history not found with id: "
                                                + id
                                )
                        );

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: "
                                        + request.getUserId()
                        )
                );

        chatHistory.setUserMessage(
                request.getUserMessage()
        );

        chatHistory.setAiResponse(
                request.getAiResponse()
        );

        chatHistory.setTimestamp(
                request.getTimestamp()
        );

        chatHistory.setUser(user);

        return mapToResponse(
                chatHistoryRepository.save(chatHistory)
        );
    }

    @Override
    public void deleteChatHistory(Long id) {

        if (!chatHistoryRepository.existsById(id)) {

            throw new RuntimeException(
                    "Chat history not found with id: " + id
            );
        }

        chatHistoryRepository.deleteById(id);
    }

    private ChatHistoryResponse mapToResponse(
            ChatHistory chatHistory
    ) {

        return ChatHistoryResponse.builder()
                .id(chatHistory.getId())
                .userMessage(
                        chatHistory.getUserMessage()
                )
                .aiResponse(
                        chatHistory.getAiResponse()
                )
                .timestamp(
                        chatHistory.getTimestamp()
                )
                .userId(
                        chatHistory.getUser() != null
                                ? chatHistory.getUser().getId()
                                : null
                )
                .build();
    }
}