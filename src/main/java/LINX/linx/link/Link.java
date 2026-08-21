package LINX.linx.link;

import LINX.linx.folder.Folder;
import LINX.linx.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String name;
    private String description;
    private String imageUrl;

    private int clickCount;

    private boolean isPinned;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void togglePinned() {
        this.isPinned = !this.isPinned; // 고정 상태 반전
    }
}
