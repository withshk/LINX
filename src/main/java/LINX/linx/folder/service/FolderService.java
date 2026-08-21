package LINX.linx.folder.service;

import LINX.linx.folder.dto.response.FolderResponse;
import LINX.linx.folder.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    private final FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public List<FolderResponse> getAllFolders() {
        return folderRepository.findAll()
                .stream()
                .map(FolderResponse::from)
                .toList();
    }

}
