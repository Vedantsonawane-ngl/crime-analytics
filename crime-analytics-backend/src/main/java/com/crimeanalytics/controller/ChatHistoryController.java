package com.crimeanalytics.controller;

import com.crimeanalytics.dto.request.ChatHistoryRequest;
import com.crimeanalytics.dto.request.response.ChatHistoryResponse;
import com.crimeanalytics.service.ChatHistoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-history")
@RequiredArgsConstructor
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @PostMapping
    public ResponseEntity<ChatHistoryResponse> createChatHistory(
            @Valid @RequestBody ChatHistoryRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        chatHistoryService.createChatHistory(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<ChatHistoryResponse>> getAllChatHistory() {

        return ResponseEntity.ok(
                chatHistoryService.getAllChatHistory()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatHistoryResponse> getChatHistoryById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                chatHistoryService.getChatHistoryById(id)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChatHistoryResponse>> getByUserId(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                chatHistoryService.getChatHistoryByUserId(userId)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChatHistoryResponse> updateChatHistory(
            @PathVariable Long id,
            @Valid @RequestBody ChatHistoryRequest request
    ) {

        return ResponseEntity.ok(
                chatHistoryService.updateChatHistory(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChatHistory(
            @PathVariable Long id
    ) {

        chatHistoryService.deleteChatHistory(id);

        return ResponseEntity.ok(
                "Chat history deleted successfully"
        );
    }
}