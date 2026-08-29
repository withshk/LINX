package LINX.linx.folder.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.folder.Folder;
import LINX.linx.folder.dto.request.FolderRequest;
import LINX.linx.folder.dto.response.FolderResponse;
import LINX.linx.folder.repository.FolderRepository;
import LINX.linx.user.User;
import LINX.linx.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final UserRepository userRepository;

    public FolderService(FolderRepository folderRepository, UserRepository userRepository) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
    }

    public List<FolderResponse> getAllFolders() {
        return folderRepository.findAll()
                .stream()
                .map(FolderResponse::from)
                .toList();
    }

    public FolderResponse createFolder(FolderRequest folderRequest, Long userId) {
        if(folderRequest.getName() == null || folderRequest.getName().isBlank()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "폴더 이름을 입력해주세요.");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("USER_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."));
        Folder folder = new Folder(folderRequest.getName(), user);
        folderRepository.save(folder);
        return FolderResponse.from(folder);

    }

}
