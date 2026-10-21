package LINX.linx.signup.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.emailverfication.EmailVerification;
import LINX.linx.emailverfication.repository.EmailVerificationRepository;
import LINX.linx.signup.dto.request.SignupRequest;
import LINX.linx.signup.dto.response.SignupResponse;
import LINX.linx.signup.repository.SignupRepository;
import LINX.linx.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SignupService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$");

    private final SignupRepository signupRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationRepository emailVerificationRepository;

    @Transactional
    public SignupResponse signup(SignupRequest request) {

        // 1. 이메일이 중복되는지 체크하는 코드
        if (signupRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("CONFLICTED_EMAIL", HttpStatus.CONFLICT, "이미 가입된 이메일입니다.");
        }

        // 2. 필수값을 누락했을 때 검증하기 위한 코드
        if (isBlank(request.getEmail()) || isBlank(request.getUsername())
                || isBlank(request.getPassword()) || isBlank(request.getPasswordConfirm())) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "모든 값을 작성해주십시오.");
        }

        // 3. 이메일 형식이 맞는지 검증하는 코드
        if (!EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            throw new CustomException("INVALID_EMAIL", HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다.");
        }

        // 4. 이메일 인증을 완료했는지 확인하는 코드
        EmailVerification verification = emailVerificationRepository.findTopByEmailOrderByIdDesc(request.getEmail())
                .orElseThrow(() -> new CustomException("EMAIL_NOT_VERIFIED", HttpStatus.BAD_REQUEST, "이메일 인증을 먼저 완료해주세요."));
        if (!verification.isVerified()) {
            throw new CustomException("EMAIL_NOT_VERIFIED", HttpStatus.BAD_REQUEST, "이메일 인증을 먼저 완료해주세요.");
        }

        // 5. 비밀번호가 일치하는지 검증하는 코드
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new CustomException("PASSWORD_MISMATCH", HttpStatus.BAD_REQUEST, "비밀번호를 다시 확인해주세요.");
        }


        // 6. 유저네임이 중복되는지 체크하는 코드
        if (signupRepository.existsByUsername(request.getUsername())) {
            throw new CustomException("CONFLICTED_USERNAME", HttpStatus.CONFLICT, "이미 사용중인 유저네임입니다.");
        }


        // 7. 엔티티 생성 및 저장
        try {
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            User user = User.builder()
                    .email(request.getEmail())
                    .username(request.getUsername())
                    .password(encodedPassword)
                    .createdAt(LocalDateTime.now())
                    .build();

            User savedUser = signupRepository.save(user);

            return SignupResponse.from(savedUser);
        } catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
            throw new CustomException("SIGNUP_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
