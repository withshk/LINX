package LINX.linx.login.dto.response;

import LINX.linx.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginResponse {

    private final UserInfo user;

    public static LoginResponse from(User user) {
        return new LoginResponse(
                new UserInfo(user.getId(), user.getEmail(), user.getUsername())
        );
    }

    @Getter
    @RequiredArgsConstructor
    public static class UserInfo {
        private final Long id;
        private final String email;
        private final String username;
    }
}
