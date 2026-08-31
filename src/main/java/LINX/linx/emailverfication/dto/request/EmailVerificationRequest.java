package LINX.linx.emailverfication.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class EmailVerificationRequest {
    private final String email;
}
