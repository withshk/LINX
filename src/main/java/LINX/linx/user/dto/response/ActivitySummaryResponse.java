package LINX.linx.user.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class ActivitySummaryResponse {

    private final LocalDate joinedAt;
    private final long monthlyAddedLinkCount;
    private final long totalLinkCount;
    private final MostClickedLink mostClickedLink;

    @Getter
    @RequiredArgsConstructor
    public static class MostClickedLink {
        private final Long id;
        private final String name;
        private final String url;
        private final int clickCount;
    }
}
