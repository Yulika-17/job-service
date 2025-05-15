package com.jobportal.repository;

import com.jobportal.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProfileRepository extends MongoRepository<Profile, Long> {
    public List<Profile> findByVerifiedFalse();
    public int countByUniversity(String university);
    public int countByUniversityAndVerified(String university, Boolean verified);
}
