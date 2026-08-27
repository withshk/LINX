package LINX.linx.link.repository;

import LINX.linx.link.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findByIsPinned(Boolean pinned);
}