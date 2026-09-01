package LINX.linx.user.service;

import LINX.linx.dto.common.exception.CustomException;
import LINX.linx.link.Link;
import LINX.linx.link.repository.LinkRepository;
import LINX.linx.user.User;
import LINX.linx.user.repository.UserRepository;
import LINX.linx.user.dto.response.ActivitySummaryResponse;
import LINX.linx.user.dto.response.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final LinkRepository linkRepository;

    public UserService(UserRepository userRepository, LinkRepository linkRepository) {
        this.userRepository = userRepository;
        this.linkRepository = linkRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    public ActivitySummaryResponse getActivitySummary(Long userId) {
        try {
            User user = userRepository.findById(userId).orElseThrow();

            LocalDateTime monthStart = LocalDateTime.now().toLocalDate().withDayOfMonth(1).atStartOfDay();
            LocalDateTime monthEnd = monthStart.plusMonths(1);

            long totalLinkCount = linkRepository.countByUserId(userId);
            long monthlyAddedLinkCount = linkRepository.countByUserIdAndCreatedAtBetween(userId, monthStart, monthEnd);

            ActivitySummaryResponse.MostClickedLink mostClickedLink = linkRepository.findTopByUserIdOrderByClickCountDesc(userId)
                    .map(this::toMostClickedLink)
                    .orElse(null);

            return new ActivitySummaryResponse(
                    user.getCreatedAt().toLocalDate(),
                    monthlyAddedLinkCount,
                    totalLinkCount,
                    mostClickedLink
            );
        } catch (Exception e) {
            throw new CustomException("SUMMARY_FAILED", HttpStatus.INTERNAL_SERVER_ERROR, "나중에 다시 시도해주십시오.");
        }
    }

    private ActivitySummaryResponse.MostClickedLink toMostClickedLink(Link link) {
        return new ActivitySummaryResponse.MostClickedLink(
                link.getId(), link.getName(), link.getUrl(), link.getClickCount()
        );
    }
}
