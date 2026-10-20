import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { api, type ActivitySummary } from "../../api/client";
import foldericon from "../../assets/foldericon.svg"
import linkicon from "../../assets/linkicon.svg"

function formatDate(date: string) {
    return date.replaceAll("-", "."); // 서버가 "2026-10-20" 형식으로 줌
}

export function StatsSummary() {
    const [folderCount, setFolderCount] = useState(0);
    const [summary, setSummary] = useState<ActivitySummary | null>(null);

    useEffect(() => {
        api.getFolders().then((folders) => setFolderCount(folders.length)).catch((e) => alert(e.message));
        api.getActivitySummary().then(setSummary).catch((e) => alert(e.message));
    }, []);

    const linkCount = summary?.totalLinkCount ?? 0;
    const mostClickedLink = summary?.mostClickedLink;
    const thisMonthLinkCount = summary?.monthlyAddedLinkCount ?? 0;
    const joinedText = summary ? formatDate(summary.joinedAt) : "-";

    return (
        <Wrap>
            <CountRow>
                <CountCard>
                    <IconBox>
                        <img src={foldericon}/>
                    </IconBox>
                    <CountText>
                        <Count>{folderCount}개</Count>
                        <Label>총 생성한 파일</Label>
                    </CountText>
                </CountCard>
                <CountCard>
                    <IconBox>
                        <img src={linkicon}/>
                    </IconBox>
                    <CountText>
                        <Count>{linkCount}개</Count>
                        <Label>총 생성한 링크</Label>
                    </CountText>
                </CountCard>
            </CountRow>

            <SummaryCard>
                <SummaryTitle>활동 요약</SummaryTitle>
                <SummaryRow>
                    <SummaryLabel>가장 많이 클릭한 링크</SummaryLabel>
                    {mostClickedLink ? (
                        <SummaryValue>
                            {mostClickedLink.name}
                            <Badge>{mostClickedLink.clickCount}회</Badge>
                        </SummaryValue>
                    ) : (
                        <SummaryValue>아직 없어요</SummaryValue>
                    )}
                </SummaryRow>
                <SummaryRow>
                    <SummaryLabel>이번 달 추가한 링크</SummaryLabel>
                    <SummaryValue>{thisMonthLinkCount}개</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                    <SummaryLabel>가입 일자</SummaryLabel>
                    <SummaryValue>{joinedText}</SummaryValue>
                </SummaryRow>
            </SummaryCard>
        </Wrap>
    );
}
const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    width:96%;
    max-width:1500px;
    min-width:560px;
`
const CountRow = styled.div`
    display:flex;
    gap:20px;
`
const CountCard = styled.div`
    flex:1;
    background-color:#fff;
    border:1.5px solid #EFEFEF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius:20px;
    padding:30px;

    display:flex;
    align-items:center;
    gap:20px;
`
const IconBox = styled.div`
    width:56px;
    height:56px;
    border-radius:16px;

    display:flex;
    justify-content:center;
    align-items:center;
    flex-shrink:0;
`
const CountText = styled.div`
    display:flex;
    flex-direction:column;
    gap:4px;
`
const Count = styled.div`
    font-size:22px;
    font-weight:700;
    color:#222;
`
const Label = styled.div`
    font-size:14px;
    color:#989898;
`
const SummaryCard = styled.div`
    background-color:#fff;
    border:1.5px solid #EFEFEF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius:20px;
    padding:30px;

    display:flex;
    flex-direction:column;
    gap:18px;
`
const SummaryTitle = styled.div`
    font-size:16px;
    font-weight:700;
    color:#222;
`
const SummaryRow = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const SummaryLabel = styled.div`
    font-size:14px;
    color:#989898;
`
const SummaryValue = styled.div`
    font-size:14px;
    font-weight:700;
    color:#222;

    display:flex;
    align-items:center;
    gap:8px;
`
const Badge = styled.span`
    font-size:12px;
    font-weight:700;
    color:#FF7EB6;
    background-color:#FFE1ED;
    border-radius:20px;
    padding:2px 10px;
`