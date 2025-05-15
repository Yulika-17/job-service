package com.jobportal.dto;

import com.jobportal.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private Long id;
    private String jobTitle;
    private String company;
    private List<ApplicantDTO> applicants;
    private String about;
    private String experience;
    private String jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private String description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;
    private Long postedBy;
    // Новые поля по фильтрам
    private String workFormat; // "Офис", "Удалёнка", "Гибрид"
    private String educationLevel; // "1 курс", "Магистратура" и т.д.
    private List<String> academicCompatibility; // "Можно зачесть как практику" и др.
    private List<String> taskTypes; // "Учебные задачи", "Реальные задачи", ...
    private List<String> studentSupport; // "Есть ментор", "Есть обучение", ...
    private String workLanguage; // "Русский", "Английский", "Неважно"
    private String equipmentAccess; // "Выдают технику", "Нужен свой ноутбук", ...
    private List<String> flexibility; // "Гибкий график", "Только на каникулах", ...
    private String duration; // "< 1 месяца", "1–3 месяца", "> 3 месяцев"
    private String startPeriod; // "Июнь", "Июль", ..., "Гибко"

//    public Job toEntity() {
//        return new Job(this.id, this.jobTitle, this.company, this.applicants!=null?this.applicants.stream().map((x)->x.toEntity()).toList():null, this.about, this.experience, this.jobType,
//                this.location, this.packageOffered, this.postTime, this.description, this.skillsRequired,
//                this.jobStatus, this.postedBy);
//    }
public Job toEntity() {
    return new Job(
            this.id,
            this.jobTitle,
            this.company,
            this.applicants!=null?this.applicants.stream().map((x)->x.toEntity()).toList():null,
            this.about,
            this.experience,
            this.jobType,
            this.location,
            this.packageOffered,
            this.postTime,
            this.description,
            this.skillsRequired,
            this.jobStatus,
            this.postedBy,
            this.workFormat,
            this.educationLevel,
            this.academicCompatibility,
            this.taskTypes,
            this.studentSupport,
            this.workLanguage,
            this.equipmentAccess,
            this.flexibility,
            this.duration,
            this.startPeriod
    );
}
}
