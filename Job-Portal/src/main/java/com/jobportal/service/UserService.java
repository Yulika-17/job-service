package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.exception.JobPortalException;

import java.util.List;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;
    public UserDTO registerAlternative(UserDTO userDTO) throws JobPortalException;
    public UserDTO getUserByEmail(String email) throws JobPortalException;

    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

    public Boolean sendRegistrationOtp(String email) throws Exception;
    public Boolean sendOtp(String email) throws Exception;

    public Boolean verifyOtp(String email, String otp) throws JobPortalException;

    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException;
    public List<UserDTO> getApplicants() throws JobPortalException;
}
