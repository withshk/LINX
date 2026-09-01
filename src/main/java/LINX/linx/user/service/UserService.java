package LINX.linx.user.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.user.User;
import LINX.linx.user.repository.UserRepository;
import LINX.linx.user.dto.response.UserProfileResponse;
import LINX.linx.user.dto.response.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    public UserProfileResponse getProfile(Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException("USER_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."));
            return UserProfileResponse.from(user);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomException("PROFILE_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }
}
