package LINX.linx.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class LinkListData {

    private final List<LinkResponse> links;
    private final int totalCount;

    public LinkListData(List<LinkResponse> links, int totalCount) {
        this.links = links;
        this.totalCount = totalCount;
    }

}
