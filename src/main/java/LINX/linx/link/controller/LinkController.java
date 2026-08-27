package LINX.linx.link.controller;


import LINX.linx.link.dto.LinkListData;
import LINX.linx.link.dto.request.LinkRequest;
import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.dto.ApiResponse;
import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.link.service.LinkService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/pinned")
    public ApiResponse<LinkListData> getPinnedLinks() {
        List<LinkResponse> links = linkService.getPinnedLinks();
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

    @DeleteMapping("/{linkId}")
    public ApiResponse<Void> deleteLink(@PathVariable Long linkId) {
        linkService.deleteLink(linkId);
        return ApiResponse.success("링크가 삭제되었습니다.");
    }


    private Long getCurrentUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            throw new CustomException("LOGIN_REQUIRED", HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return (Long) session.getAttribute("userId");
    }

    @PostMapping
    public ApiResponse<LinkResponse> createLink(@RequestBody LinkRequest linkRequest, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        LinkResponse response = linkService.createLink(linkRequest, userId);
        return ApiResponse.success(response);
    }

    @PostMapping("/{linkId}/image")
    public ApiResponse<Map<String, Object>> uploadImage(@PathVariable Long linkId,
                                                          @RequestParam(value = "image", required = false) MultipartFile image) {
        LinkResponse response = linkService.uploadImage(linkId, image);
        return ApiResponse.success(Map.of("id", response.getId(), "imageUrl", response.getImageUrl()));
    }

}
