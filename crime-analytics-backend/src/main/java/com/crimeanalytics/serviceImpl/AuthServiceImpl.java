package com.crimeanalytics.serviceImpl;

import com.crimeanalytics.dto.request.RegisterRequest;
import com.crimeanalytics.entity.Role;
import com.crimeanalytics.entity.User;
import com.crimeanalytics.repository.UserRepository;
import com.crimeanalytics.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.crimeanalytics.dto.request.LoginRequest;
import com.crimeanalytics.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    @Override
    public String login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return null;
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return null;
        }

        return jwtService.generateToken(user.getEmail());
    }
}