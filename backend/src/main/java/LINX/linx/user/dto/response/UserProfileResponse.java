package LINX.linx.user.dto.response;

import LINX.linx.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserProfileResponse {

    private final UserInfo user;

    public static UserProfileResponse from(User user) {
        return new UserProfileResponse(
                new UserInfo(user.getId(), user.getEmail(), user.getUsername(), user.getProfileImageUrl())
        );
    }

    @Getter
    @RequiredArgsConstructor
    public static class UserInfo {
        private final Long id;
        private final String email;
        private final String username;
        private final String profileImageUrl;
    }
}
