package LINX.linx.login.controller;

import LINX.linx.dto.ApiResponse;
import LINX.linx.login.dto.request.LoginRequest;
import LINX.linx.login.dto.response.LoginResponse;
import LINX.linx.login.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

    private static final int REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 14; // 14일 동안 로그인 유지
    private static final int DEFAULT_MAX_AGE = 60 * 30; // 30분 동안 로그인 유지

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request,
                                                              HttpServletRequest httpRequest) {
        LoginResponse response = loginService.login(request);

        HttpSession session = httpRequest.getSession(true);
        session.setAttribute("userId", response.getUser().getId());
        session.setMaxInactiveInterval(request.isRememberMe() ? REMEMBER_ME_MAX_AGE : DEFAULT_MAX_AGE); //이게 로그인 한 거 기억
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
