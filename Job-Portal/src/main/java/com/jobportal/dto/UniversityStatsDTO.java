package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UniversityStatsDTO {
    private int totalStudents;
    private int verifiedStudents;
    private int studentsWithApplications;
    private int studentsHired;
}
