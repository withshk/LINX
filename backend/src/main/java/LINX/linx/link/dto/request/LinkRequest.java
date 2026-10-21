package LINX.linx.link.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class LinkRequest {

    private String url;
    private String name;
    private String description;
    private String imageUrl;
    private Long folderId;
    

}
