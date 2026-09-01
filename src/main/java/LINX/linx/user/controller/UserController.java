package LINX.linx.user.controller;

import LINX.linx.dto.ApiResponse;
import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.user.dto.response.ActivitySummaryResponse;
import LINX.linx.user.dto.response.UserProfileResponse;
import LINX.linx.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        UserProfileResponse response = userService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/activity/summary")
    public ResponseEntity<ApiResponse<ActivitySummaryResponse>> getActivitySummary(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        ActivitySummaryResponse response = userService.getActivitySummary(userId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    private Long getCurrentUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            throw new CustomException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return (Long) session.getAttribute("userId");
    }
}
