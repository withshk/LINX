package LINX.linx.user.dto.response;

import LINX.linx.user.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserResponse {

    private final Long id;
    private final String email;
    private final String username;
    private final String profileImageUrl;
    private final boolean isVerified;
    private final LocalDateTime createdAt;

    public UserResponse(Long id, String email, String username, String profileImageUrl,
                         boolean isVerified, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.profileImageUrl = profileImageUrl;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
    }

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getProfileImageUrl(),
                user.isVerified(),
                user.getCreatedAt()
        );
    }

}
