package LINX.linx.folder;

import LINX.linx.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Folder(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public void updateFolder(String name) {
        this.name = name;
    }

}
