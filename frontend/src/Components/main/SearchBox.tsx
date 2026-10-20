import styled from "@emotion/styled";
import { useState } from "react";

import plus from "../../assets/plus.svg"
import "../../css/AllMargin.css"
import { LinkPlus } from "./LinkPlus";
import { LinkBox } from "../main/LinkBox"
import { SortDropdown } from "./DropBox";
import type { Link, Folder, SortOption } from "../types/link";

interface SearchBoxProps {
    links: Link[];
    folders: Folder[];
    selectedFolder: number | "all";
    onAddLink: (link: Omit<Link, "id" | "clickCount" | "createdAt">, imgFile: File | null) => void;
    onEditLink: (link: Link, imgFile: File | null) => void;
    onDeleteLink: (id: number) => void;
    onMoveFolder: (id: number, folderId: number | null) => void;
    onTogglePin: (id: number) => void;
    onClickLink: (id: number) => void;
}

export function SearchBox({
    links,
    folders,
    selectedFolder,
    onAddLink,
    onEditLink,
    onDeleteLink,
    onTogglePin,
    onClickLink,
}: SearchBoxProps) {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState("");
    const [editLink, setEditLink] = useState<Link | null>(null);
    const [sortOption, setSortOption] = useState<SortOption>("latest");

    const handleAdd = (link: { url: string; title: string; memo: string | null; img: string | null; folderId: number | null }, imgFile: File | null) => {
        if (editLink) { // 수정 모드로 들어온 거면 기존 링크에 새로 입력한 값만 덮어씀
            onEditLink({ ...editLink, ...link }, imgFile);
        } else { // 수정 모드 아니면 새 링크로 추가, pinned는 항상 false로 시작
            onAddLink({ ...link, pinned: false }, imgFile);
        }
        setEditLink(null); // 여기서 다시 null로 안 돌려놓으면 다음에 추가 눌러도 계속 수정모드로 남아있어서 헷갈렸던 부분
    }

    const handleClose = () => {
        setIsClick(false);
        setEditLink(null);
    }

    const folderFilter = links.filter((link) =>
        selectedFolder === "all" || link.folderId === selectedFolder
    );

    const sortCompare = (a: Link, b: Link) => {
        switch (sortOption) {
            case "oldest":
                return a.createdAt - b.createdAt;
            case "mostClicked":
                return b.clickCount - a.clickCount;
            case "leastClicked":
                return a.clickCount - b.clickCount;
            case "latest":
            default:
                return b.createdAt - a.createdAt;
        }
    };

    const linkFilter = folderFilter
        .filter((link) =>
            link.title.includes(search) ||
            link.url.includes(search)
        )
        .sort(sortCompare) // 드롭다운에서 고른 기준(최신순/오래된순/방문많은순 등)으로 먼저 정렬
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)); // 그다음 고정된 링크만 맨 앞으로 뺌 (정렬 기준보다 우선). sort를 두번 거는게 왜 순서가 안깨지는지 처음엔 이해가 안갔는데, sort가 안정정렬이라 pinned값이 같으면 앞에서 정한 순서가 그대로 유지되는거였음

    return (
        <Body>
            <TopBox>
                <Search
                value={search}
                onChange={(e)=> setSearch(e.target.value)}></Search>
                <Plus
                onClick={()=>setIsClick(true)}>
                    <Img src={plus}/>
                    <p>링크 추가</p>
                </Plus>
                {isClick && (
                    <LinkPlus
                        onCancel={handleClose}
                        onAdd={handleAdd}
                        editLink={editLink ?? undefined}
                        folders={folders}
                    />
                )}
                </TopBox>
            <SortDropdown value={sortOption} onChange={setSortOption} />
            <LinkList>
                {linkFilter.map((link) => (
                    <LinkBox
                        key={link.id}
                        link={link}
                        onDelete={()=>onDeleteLink(link.id)}
                        onEdit={()=>{
                            setEditLink(link);
                            setIsClick(true);
                        }}
                        onTogglePin={()=>onTogglePin(link.id)}
                        onClickLink={()=>onClickLink(link.id)}
                    />
                ))}
            </LinkList>
            
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100%;

    display:flex;
    flex-direction:column;
    gap:15px;
    overflow:hidden;
`
const Search = styled.input`
    width:680px;
    height:60px;
    border:#DADADA solid 3px;
    border-radius:10px;
    outline:none;
    font-family:inherit;
    font-size:18px;
    padding-left:10px;
`
const Plus = styled.div`
    width:150px;
    height:60px;
    background-color:#FF7EB6;
    border-radius:10px;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    font-size:17px;
    color:#fff;
    cursor:pointer;
`
const Img = styled.img`
    width:20px;
`
const LinkList = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-content: flex-start;

    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-bottom: 10px;
`
const TopBox = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
`