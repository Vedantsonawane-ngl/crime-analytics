package com.crimeanalytics.repository;

import com.crimeanalytics.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByUserId(Long userId);

    List<ChatHistory> findAllByOrderByTimestampDesc();
}