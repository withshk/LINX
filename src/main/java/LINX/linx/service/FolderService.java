package LINX.linx.service;

import LINX.linx.dto.FolderResponse;
import LINX.linx.entity.Folder;
import LINX.linx.repository.FolderRepository;
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
