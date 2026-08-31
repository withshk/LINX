package LINX.linx.emailverfication.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.emailverfication.EmailVerification;
import LINX.linx.emailverfication.repository.EmailVerificationRepository;
import LINX.linx.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$");
    private static final SecureRandom RANDOM = new SecureRandom();

    private final EmailVerificationRepository emailVerificationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    @Value("${mail.auth-code-expiration-millis}")
    private long expirationMillis;

    @Transactional
    public long sendCode(String email) {
        if (email == null || email.isBlank()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "모든 값을 작성해주십시오.");
        }
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new CustomException("INVALID_EMAIL", HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new CustomException("CONFLICTED_EMAIL", HttpStatus.CONFLICT, "이미 가입된 이메일입니다.");
        }

        String code = generateCode();
        EmailVerification verification = EmailVerification.builder()
                .email(email)
                .code(code)
                .expiresAt(LocalDateTime.now().plusNanos(expirationMillis * 1_000_000))
                .build();
        emailVerificationRepository.save(verification);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[LINX] 이메일 인증 코드");
        message.setText("인증 코드: " + code);
        try {
            mailSender.send(message);
        } catch (MailException e) {
            throw new CustomException("EMAIL_SEND_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }

        return expirationMillis / 1000;
    }

    @Transactional
    public void verifyCode(String email, String code) {
        try {
            EmailVerification verification = emailVerificationRepository.findTopByEmailOrderByIdDesc(email)
                    .orElseThrow(() -> new CustomException("EMAIL_NOT_REQUESTED", HttpStatus.BAD_REQUEST, "인증 코드를 먼저 요청해주세요."));

            if (verification.isExpired()) {
                throw new CustomException("EXPIRED_CODE", HttpStatus.GONE, "코드가 만료됐습니다. 재발급 후 다시 시도해주십시오.");
            }
            if (!verification.getCode().equals(code)) {
                throw new CustomException("INVALID_CODE", HttpStatus.BAD_REQUEST, "코드가 옳지 않습니다.");
            }

            verification.verify();
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomException("VERIFY_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }

    private String generateCode() {
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }
}
