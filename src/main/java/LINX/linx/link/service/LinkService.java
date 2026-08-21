package LINX.linx.link.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.link.Link;
import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.link.repository.LinkRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class LinkService {

    private final LinkRepository linkRepository;

    public LinkService(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    public List<LinkResponse> getAllLinks() {
        return linkRepository.findAll()
                .stream()
                .map(LinkResponse::from)
                .toList();
    }

    public LinkResponse togglePin(Long id) {
        // findById에서 id를 찾고, 비어있으면 에러
        Link link = linkRepository.findById(id).orElseThrow(() -> new CustomException("LINK_NOT_FOUND", HttpStatus.NOT_FOUND, "존재하지 않는 링크입니다."));


        link.togglePinned(); // 고정 상태 반전

        return LinkResponse.from(link); // 반전한 고정 상태를 LinkResponse에 저장
    }

}
