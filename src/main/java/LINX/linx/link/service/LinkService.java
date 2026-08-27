package LINX.linx.link.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.folder.Folder;
import LINX.linx.folder.repository.FolderRepository;
import LINX.linx.link.Link;
import LINX.linx.link.dto.request.LinkRequest;
import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.link.repository.LinkRepository;
import LINX.linx.user.User;
import LINX.linx.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class LinkService {

    @Value("${app.upload-dir}")
    private String uploadDir;
    private final LinkRepository linkRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");
    private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

    public LinkService(LinkRepository linkRepository, FolderRepository folderRepository, UserRepository userRepository) {
        this.linkRepository = linkRepository;
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
    } // 받은 값을 쓰기 위해 상위 리포지토리? 에다 대입(색깔놀이)

    public List<LinkResponse> getAllLinks() {
        return linkRepository.findAll()
                .stream()
                .map(LinkResponse::from)
                .toList();
    }

    public List<LinkResponse> getPinnedLinks() {

        return linkRepository.findByIsPinned(true)
                .stream()
                .map(LinkResponse::from)
                .toList();
    }

    public LinkResponse togglePin(Long id) {
        // findById에서 id를 찾고, 비어있으면 에러
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new CustomException("LINK_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 링크입니다."));


        link.togglePinned(); // 고정 상태 반전

        return LinkResponse.from(link); // 반전한 고정 상태를 LinkResponse에 저장
    }

    public LinkResponse increaseClickCount(Long id) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new CustomException("LINK_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 링크입니다."));

        link.increaseClickCount();

        return LinkResponse.from(link);
    }

    public void deleteLink(Long id) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new CustomException("LINK_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 링크입니다."));

        linkRepository.delete(link);
    }

    public LinkResponse createLink(LinkRequest linkRequest, Long userId) {
        if (linkRequest.getUrl() == null || linkRequest.getUrl().isBlank()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "url을 입력해주세요.");
        }
        if (linkRequest.getName() == null || linkRequest.getName().isBlank()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "이름을 입력해주세요.");
        } // 필수값 누락 에러

        if(!linkRequest.getUrl().startsWith("http://") && !linkRequest.getUrl().startsWith("https://")) {
            throw new CustomException("INVALID_FORMAT", HttpStatus.BAD_REQUEST, "올바른 url 형식이 아닙니다.");
        } // url 형식 오류

        Folder folder = null;
        if(linkRequest.getFolderId() != null) {
            folder = folderRepository.findById(linkRequest.getFolderId())
                    .orElseThrow(() -> new CustomException("FOLDER_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 폴더입니다."));
        } // 폴더 아이디 검증(null이면 스킵, 있으면 조회 후 없으면 예외)

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("USER_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."));
        //유저 아이디 검증(이론상 쓸 일 없지만 방어코드)

        Link link = new Link(
                linkRequest.getUrl(),
                linkRequest.getName(),
                linkRequest.getDescription(),
                linkRequest.getImageUrl(),
                folder,
                user
        );
        linkRepository.save(link);
        return LinkResponse.from(link);

    }

    public LinkResponse uploadImage(Long linkId, MultipartFile image) {
        Link link = linkRepository.findById(linkId)
                .orElseThrow(() -> new CustomException("LINK_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 링크입니다."));
        if (image == null || image.isEmpty()) {
            throw new CustomException("MISSING_FIELD", HttpStatus.BAD_REQUEST, "이미지 파일을 첨부해주세요.");
        }
        String extension = getExtension(image.getOriginalFilename());
        if (!ALLOWED_IMAGE_EXTENSIONS.contains(extension)) {
            throw new CustomException("INVALID_FILE_TYPE", HttpStatus.BAD_REQUEST, "jpg, png, webp 형식만 업로드할 수 있습니다.");
        }
        if (image.getSize() > MAX_IMAGE_SIZE) {
            throw new CustomException("FILE_TOO_LARGE", HttpStatus.PAYLOAD_TOO_LARGE, "이미지는 5MB 이하만 업로드할 수 있습니다.");
        }
        String filename = linkId + "." + extension;
        try {
            Path dir = Path.of(uploadDir, "link");
            Files.createDirectories(dir);
            Files.copy(image.getInputStream(), dir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new CustomException("IMAGE_UPLOAD_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/link/" + filename)
                .toUriString();
        link.uploadImage(imageUrl);

        return LinkResponse.from(link);
    }

    public String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
        } //파일네임이 없거나 .이 없으면 "" 반환. 그건 나중에 위에 업로드 이미지에서 에러로 변환된다.
        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase(); //확장자를 어케 쓰든 소문자 취급
    }



}
