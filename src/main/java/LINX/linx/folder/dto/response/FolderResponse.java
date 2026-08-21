package LINX.linx.folder.dto.response;

import LINX.linx.folder.Folder;
import lombok.Getter;

@Getter
public class FolderResponse {

    private final Long id;
    private final String name;

    public FolderResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static FolderResponse from(Folder folder) {
        return new FolderResponse(
                folder.getId(),
                folder.getName()
        );
    }

}
