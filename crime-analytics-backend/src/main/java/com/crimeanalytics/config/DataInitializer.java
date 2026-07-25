package com.crimeanalytics.config;

import com.crimeanalytics.entity.*;
import com.crimeanalytics.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CrimeRepository crimeRepository;
    private final CrimeRecordRepository crimeRecordRepository;
    private final CriminalRepository criminalRepository;
    private final OfficerRepository officerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Default Officer Account
        if (!userRepository.existsByEmail("officer@gov.in")) {
            User officer = User.builder()
                    .name("Duty Officer Yadnyesh")
                    .email("officer@gov.in")
                    .password(passwordEncoder.encode("officer123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(officer);
        }

        // 2. Seed Default Crime Category
        if (crimeRepository.count() == 0) {
            Crime cyber = new Crime();
            cyber.setCrimeName("Cyber Financial Fraud");
            cyber.setCategory("Cybercrime");
            cyber.setSeverity("High");
            cyber.setDescription("Financial skimming and phishing targeting digital payment gateways");
            crimeRepository.save(cyber);

            // Seed Sample Record
            CrimeRecord rec = CrimeRecord.builder()
                    .crimeType("Cybercrime")
                    .city("Bengaluru Urban")
                    .state("Karnataka")
                    .district("Bengaluru Urban")
                    .policeStation("Electronic City PS")
                    .latitude(12.9716)
                    .longitude(77.5946)
                    .timeOfDay("NIGHT")
                    .modusOperandi("Phishing SMS Skimming")
                    .crimeDate(LocalDate.now())
                    .status("INVESTIGATING")
                    .severity("High")
                    .description("Unauthorized ATM withdrawal and online transaction fraud reported in Electronic City cluster.")
                    .crime(cyber)
                    .anomalyFlag(true)
                    .riskScore(88)
                    .build();
            crimeRecordRepository.save(rec);
        }

        // 3. Seed Sample Criminal
        if (criminalRepository.count() == 0) {
            Criminal c = Criminal.builder()
                    .name("Ramesh Kumar")
                    .alias("Cyber Ranga")
                    .gender("Male")
                    .age(34)
                    .address("M.G. Road, Bengaluru")
                    .phoneNumber("+91-9876543210")
                    .criminalStatus("WANTED")
                    .description("Repeat offender involved in online banking fraud syndicates across Karnataka.")
                    .build();
            criminalRepository.save(c);
        }

        // 4. Seed Officer
        if (officerRepository.count() == 0) {
            Officer off = new Officer();
            off.setName("Inspector Yadnyesh");
            off.setBadgeNumber("KSP-9982");
            off.setRank("Inspector");
            off.setDepartment("Cyber Crime Division");
            off.setEmail("officer@gov.in");
            off.setPhoneNumber("+91-9888877777");
            officerRepository.save(off);
        }
    }
}
