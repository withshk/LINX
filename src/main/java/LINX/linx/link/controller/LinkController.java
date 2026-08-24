package LINX.linx.link.controller;


import LINX.linx.link.dto.LinkListData;
import LINX.linx.link.dto.request.LinkRequest;
import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.dto.ApiResponse;
import LINX.linx.link.service.LinkService;
import LINX.linx.user.User;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/{linkId}/pin")
    public LinkResponse togglePin(@PathVariable Long linkId) { //PathVariable로 {linkId}에 값을 받음
        return linkService.togglePin(linkId);
    }

    @PatchMapping("/{linkId}/click")
    public LinkResponse increaseClickCount(@PathVariable Long linkId) {
        return linkService.increaseClickCount(linkId);
    }

    private Long getCurrentUserId(){
        return 1L; // 로그인 기능이 없기 때문에 임시로 만든 유저 아이디
    }

    @PostMapping
    public ApiResponse<LinkResponse> createLink(@RequestBody LinkRequest linkRequest) {
        Long userId = getCurrentUserId();
        LinkResponse response = linkService.createLink(linkRequest, userId);
        return ApiResponse.success(response);
    }
}
