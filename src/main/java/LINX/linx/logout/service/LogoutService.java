package LINX.linx.logout.service;

import LINX.linx.dto.common.exception.CustomException;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class LogoutService {

    public void logout(String refreshToken, HttpSession session) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "refreshToken이 필요합니다.");
        }

        try {
            if (session != null) {
                session.invalidate();
            }
        } catch (IllegalStateException e) {
            throw new CustomException("LOGOUT_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }
}
