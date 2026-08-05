package LINX.linx.service;

import LINX.linx.repository.LinkRepository;
import org.springframework.stereotype.Service;

@Service
public class LinkService {

    public final LinkRepository linkRepository;

    public LinkService(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

}
