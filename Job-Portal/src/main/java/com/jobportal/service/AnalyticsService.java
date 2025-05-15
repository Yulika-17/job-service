package com.jobportal.service;

import com.jobportal.dto.UniversityStatsDTO;

public interface AnalyticsService {
    public UniversityStatsDTO getStatsForUniversity(String university);
}
