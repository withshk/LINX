package LINX.linx.signup.dto.response;

import LINX.linx.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SignupResponse {

    private final Long id;
    private final String email;
    private final String username;

    public static SignupResponse from(User user) {
        return new SignupResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername()
        );
    }

}
