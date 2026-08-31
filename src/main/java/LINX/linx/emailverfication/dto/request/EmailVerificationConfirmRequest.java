package LINX.linx.emailverfication.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public class EmailVerificationConfirmRequest {
    private final String email;
    private final String code;
}