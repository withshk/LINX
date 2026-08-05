package LINX.linx.entity;

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
    private String title;
    private String description;
    private String imageUrl;

    private int clickCount;

    private boolean isPinned;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    // user_id는 참조할 User 클래스가 없는 관계로 보류
}
