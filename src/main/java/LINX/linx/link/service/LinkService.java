package LINX.linx.link.service;

import LINX.linx.link.dto.response.LinkResponse;
import LINX.linx.link.repository.LinkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
