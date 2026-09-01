package LINX.linx.link.repository;

import LINX.linx.folder.Folder;
import LINX.linx.link.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findByIsPinned(Boolean pinned);
    List<Link> findByFolderId(Long folderId);
    long countByUserId(Long userId);
    long countByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);
    Optional<Link> findTopByUserIdOrderByClickCountDesc(Long userId);
}