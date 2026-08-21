package LINX.linx.login.dto.response;

import LINX.linx.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginResponse {
    private final String email;
    private final boolean rememberMe;

    public static LoginResponse from(User user) {
        return new LoginResponse(

                user.getEmail(),
                user.isRememberMe()
        );
    }

}
