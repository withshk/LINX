package LINX.linx.emailverfication.controller;

import LINX.linx.dto.ApiResponse;
import LINX.linx.emailverfication.dto.request.EmailVerificationConfirmRequest;
import LINX.linx.emailverfication.dto.request.EmailVerificationRequest;
import LINX.linx.emailverfication.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    @PostMapping("/verify-request")
    public ResponseEntity<ApiResponse<Void>> requestCode(@RequestBody EmailVerificationRequest request) {
        long expiresIn = emailVerificationService.sendCode(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success(request.getEmail() + " 으로 인증번호를 발송했어요!", expiresIn));
    }

    @PostMapping("/verify-confirm")
    public ResponseEntity<ApiResponse<Void>> confirmCode(@RequestBody EmailVerificationConfirmRequest request) {
        emailVerificationService.verifyCode(request.getEmail(), request.getCode());
        return ResponseEntity.ok(ApiResponse.success("인증 성공"));
    }


}
