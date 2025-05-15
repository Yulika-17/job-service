package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServieImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequenceId("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        return profileRepository.findById(id).orElseThrow(()->new JobPortalException("PROFILE_NOT_FOUND")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        profileRepository.findById(profileDTO.getId()).orElseThrow(()->new JobPortalException("PROFILE_NOT_FOUND"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfiles() throws JobPortalException {
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

//    @Override
//    public List<ProfileDTO> getUnverifiedProfiles() throws JobPortalException {
//        return profileRepository.findByVerifiedFalse().stream()
//                .map(Profile::toDTO)
//                .toList();
//    }

    @Override
    public void verifyProfile(Long id) throws JobPortalException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        profile.setVerified(true);
        profileRepository.save(profile);
    }

}
