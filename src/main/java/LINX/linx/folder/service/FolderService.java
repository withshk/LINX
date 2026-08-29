package LINX.linx.folder.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.folder.Folder;
import LINX.linx.folder.dto.request.FolderRequest;
import LINX.linx.folder.dto.response.FolderResponse;
import LINX.linx.folder.repository.FolderRepository;
import LINX.linx.link.Link;
import LINX.linx.link.repository.LinkRepository;
import LINX.linx.user.User;
import LINX.linx.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    private final LinkRepository linkRepository;

    public FolderService(FolderRepository folderRepository, UserRepository userRepository, LinkRepository linkRepository) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.linkRepository = linkRepository;
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

    public void deleteFolder(Long id) {
        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new CustomException("FOLDER_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 폴더입니다."));

        List<Link> links = linkRepository.findByFolderId(id);
        links.forEach(Link::removeFromFolder);

        folderRepository.delete(folder);
    }

}
