package LINX.linx.login.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.login.dto.request.LoginRequest;
import LINX.linx.login.dto.response.LoginResponse;
import LINX.linx.login.repository.LoginRepository;
import LINX.linx.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class LoginService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$");

    private static final int MAX_ATTEMPTS = 5;
    private static final Duration LOCK_WINDOW = Duration.ofMinutes(5);

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    // 이메일별 로그인 실패 횟수를 저장하는 거
    private final ConcurrentHashMap<String, AttemptRecord> failedAttempts = new ConcurrentHashMap<>();

    public LoginResponse login(LoginRequest request) {

        // 1. 필수값 누락 검증
        if (isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "이메일/비밀번호를 입력해주세요.");
        }

        // 2. 이메일 형식 검증
        if (!EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            throw new CustomException("INVALID_FORMAT", HttpStatus.BAD_REQUEST, "이메일 또는 비밀번호가 틀렸습니다.");
        }

        // 3. 시도 횟수 초과 검증
        checkNotLocked(request.getEmail());

        try {
            // 4. 가입되지 않은 계정 검증
            User user = loginRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> {
                        recordFailure(request.getEmail());
                        return new CustomException("AUTH_FAILED", HttpStatus.UNAUTHORIZED, "가입되지 않은 계정입니다.");
                    });

            // 5. 비밀번호 일치 검증
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                recordFailure(request.getEmail());
                throw new CustomException("INVALID_FORMAT", HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 틀렸습니다.");
            }

            // 6. 로그인 성공 - 실패 기록 초기화
            failedAttempts.remove(request.getEmail());

            return LoginResponse.from(user);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomException("LOGIN_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }

    private void checkNotLocked(String email) {
        AttemptRecord record = failedAttempts.get(email);
        if (record == null) {
            return;
        }
        if (record.count.get() >= MAX_ATTEMPTS && Instant.now().isBefore(record.windowStart.plus(LOCK_WINDOW))) {
            throw new CustomException("TOO_MANY_ATTEMPTS", HttpStatus.TOO_MANY_REQUESTS,
                    "로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
        }
    }

    private void recordFailure(String email) {
        failedAttempts.compute(email, (key, record) -> {
            if (record == null || Instant.now().isAfter(record.windowStart.plus(LOCK_WINDOW))) {
                return new AttemptRecord(new AtomicInteger(1), Instant.now());
            }
            record.count.incrementAndGet();
            return record;
        });
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private static class AttemptRecord {
        private final AtomicInteger count;
        private final Instant windowStart;

        private AttemptRecord(AtomicInteger count, Instant windowStart) {
            this.count = count;
            this.windowStart = windowStart;
        }
    }
}
