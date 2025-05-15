package com.jobportal.api;

import com.jobportal.dto.UniversityStatsDTO;
import com.jobportal.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/university")
public class UniversityAPI {
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/stats/{university}")
    public ResponseEntity<UniversityStatsDTO> getUniversityStats(@PathVariable String university) {
        return new ResponseEntity<>(analyticsService.getStatsForUniversity(university), HttpStatus.OK);
    }
}
