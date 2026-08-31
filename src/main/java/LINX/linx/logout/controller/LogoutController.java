package LINX.linx.logout.controller;

import LINX.linx.dto.ApiResponse;
import LINX.linx.logout.dto.LogoutRequest;
import LINX.linx.logout.service.LogoutService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth/logout")
@RequiredArgsConstructor
public class LogoutController {
    private final LogoutService logoutService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> logout(@RequestBody LogoutRequest request,
                                                      HttpServletRequest httpRequest) {
        logoutService.logout(request.getRefreshToken(), httpRequest.getSession(false));
        return ResponseEntity.ok(ApiResponse.success("로그아웃 되었습니다."));
    }
}
