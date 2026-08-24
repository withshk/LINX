package LINX.linx.signup.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SignupRequest {
    private final String email;
    private final String username;
    private final String password;
    private final String passwordConfirm;
}
