package LINX.linx.link.dto.response;

import LINX.linx.link.Link;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LinkResponse {

    private final Long id;
    private final String url;
    private final String name;
    private final String description;
    private final String imageUrl;
    private final int clickCount;
    private final boolean isPinned;
    private final LocalDateTime createdAt;
    private final Long folderId;


    public LinkResponse(Long id, String url, String name, String description,
                        String imageUrl, int clickCount, boolean isPinned,
                        LocalDateTime createdAt, Long folderId) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.imageUrl = imageUrl;
        this.clickCount = clickCount;
        this.isPinned = isPinned;
        this.createdAt = createdAt;
        this.folderId = folderId;
    }


    public static LinkResponse from(Link link) {
        return new LinkResponse(
                link.getId(),
                link.getUrl(),
                link.getName(),
                link.getDescription(),
                link.getImageUrl(),
                link.getClickCount(),
                link.isPinned(),
                link.getCreatedAt(),
                link.getFolder() != null ? link.getFolder().getId() : null
        );
    }

}
