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

    public void increaseClickCount() {
        this.clickCount += 1;
    }

    /*
        public Link() {}는 @NoArgsConstructor가 자동으로 만들어줬다.
        new Link();를 호출하면 실행된다.
        JPA에서 DB가 데이터 읽어올때 내부적으로 쓴다.
     */

    public Link(String url, String name, String description, String imageUrl, Folder folder, User user) {
        this.url = url;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.folder = folder;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

}
