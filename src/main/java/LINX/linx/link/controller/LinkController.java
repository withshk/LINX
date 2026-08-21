package LINX.linx.link.controller;


import LINX.linx.link.dto.LinkListData;
import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.dto.ApiResponse;
import LINX.linx.link.service.LinkService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/links")
public class LinkController {

    private final LinkService linkService;

    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping
    public ApiResponse<LinkListData> getAllLinks() {
        List<LinkResponse> links = linkService.getAllLinks();
        LinkListData data = new LinkListData(links, links.size());
        return ApiResponse.success(data);
    }
}
