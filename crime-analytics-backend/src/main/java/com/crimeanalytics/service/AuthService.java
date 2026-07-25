package com.crimeanalytics.service;

import com.crimeanalytics.dto.request.LoginRequest;
import com.crimeanalytics.dto.request.RegisterRequest;

public interface AuthService {

    void register(RegisterRequest request);
    String login(LoginRequest request);
}