package com.jobportal.service;

import com.jobportal.dto.UniversityStatsDTO;
import com.jobportal.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("analyticsService")
public class AnalyticsServiceImpl implements AnalyticsService {
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public UniversityStatsDTO getStatsForUniversity(String university) {
        int total = profileRepository.countByUniversity(university);
        int verified = profileRepository.countByUniversityAndVerified(university, true);
//        int applied = applicationRepository.countDistinctApplicantsByUniversity(university);
//        int hired = applicationRepository.countHiredByUniversity(university); // статус "HIRED"
        int applied = profileRepository.countByUniversity(university);
        int hired = profileRepository.countByUniversity(university);
        return new UniversityStatsDTO(total, verified, applied, hired);
    }
}
