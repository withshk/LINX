package LINX.linx.folder.controller;

import LINX.linx.dto.ApiResponse;
import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.folder.dto.request.FolderRequest;
import LINX.linx.folder.dto.response.FolderResponse;
import LINX.linx.folder.service.FolderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {

    private final FolderService folderService;

    public FolderController(FolderService folderService){
        this.folderService = folderService;
    }

    @GetMapping
    public List<FolderResponse> getAllFolders() {
        return folderService.getAllFolders();
    }

    private Long getCurrentUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            throw new CustomException("LOGIN_REQUIRED", HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return (Long) session.getAttribute("userId");
    }

    @PostMapping
    public ApiResponse<FolderResponse> createFolder(@RequestBody FolderRequest folderRequest, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        FolderResponse response = folderService.createFolder(folderRequest, userId);
        return ApiResponse.success(response);
    }

    @DeleteMapping("/{folderId}")
    public ApiResponse<Void> deleteFolder(@PathVariable("folderId") Long folderId) {
        folderService.deleteFolder(folderId);
        return ApiResponse.success("폴더가 삭제되었습니다.");
    }

}
