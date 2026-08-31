package LINX.linx.logout.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LogoutRequest {
    private final String refreshToken;
}
