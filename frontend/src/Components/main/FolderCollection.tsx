import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../css/AllMargin.css"

import pinkIcon from "../../assets/ppinkhouseIcon.svg"
import houseIcon from "../../assets/houseIcon.svg"
import plusIcon from "../../assets/PlusIcon.svg"
import folderIcon from "../../assets/folder.svg"
import pinkfolder from "../../assets/pinkfolder.svg"
import type { Folder } from "../types/link";
import { FolderMenu } from "./FolderMenu";

interface BoxProps{
    selected?:boolean;
}
interface FolderCollectionProps {
    folders: Folder[];
    selectedFolder: number | "all";
    onSelectFolder: (id: number | "all") => void;
    onAddFolder: (name: string) => void;
    onRenameFolder: (id: number, name: string) => void;
    onDeleteFolder: (id: number) => void;
}

export function FolderCollection({
    folders,
    selectedFolder,
    onSelectFolder,
    onAddFolder,
    onRenameFolder,
    onDeleteFolder,
}: FolderCollectionProps){
    const [isAdding, setIsAdding] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [renamingId, setRenamingId] = useState<number | null>(null);
    const [renameValue, setRenameValue] = useState("");
    const menuRef = useRef<HTMLDivElement | null>(null);

    // 메뉴가 열려있을 때, 그 메뉴(버튼 포함) 바깥을 클릭하면 닫기
    useEffect(() => {
        if (openMenuId === null) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside); // 정리함수
    }, [openMenuId]);

    const handleAddSubmit = () => {
        const name = newFolderName.trim();
        if (name) onAddFolder(name); // 입력한 이름을 실제 폴더 이름으로 추가함
        setNewFolderName(""); // 문자열 초기화 
        setIsAdding(false); // 목록 닫기
    };

    const startRename = (folder: Folder) => {
        setRenamingId(folder.id);
        setRenameValue(folder.name); // 빈칸에서 시작하지 않고 원래 값으로 시작
        setOpenMenuId(null);
    };

    const commitRename = () => {
        const name = renameValue.trim(); // 공백제거
        if (renamingId !== null && name) {
            onRenameFolder(renamingId, name);
        }
        setRenamingId(null);
    };

    return (
        <Body>
            <AllBox
            selected={selectedFolder === "all"}
            onClick={()=>onSelectFolder("all")}
            style={{backgroundColor:selectedFolder === "all" ? "#FFC4DE":""}}>
                <Img src={selectedFolder==="all" ? pinkIcon : houseIcon}/>
                <p style={{fontSize:"18px",color:selectedFolder ==="all" ? "#FF7EB6":"#636363"}}>전체</p>
            </AllBox>

            {folders.map((folder) => (
                <FolderRow
                    key={folder.id}
                    selected={selectedFolder === folder.id}
                >
                    <FolderBox
                        onClick={() => onSelectFolder(folder.id)}
                    >
                        <Img src={selectedFolder === folder.id ? pinkfolder : folderIcon}/>
                        {renamingId === folder.id ? (
                            <RenameInput
                                autoFocus
                                value={renameValue}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") commitRename();
                                    if (e.key === "Escape") setRenamingId(null);
                                }}
                                onBlur={commitRename}
                            />
                        ) : (
                            <p style={{color:selectedFolder===folder.id ? "#FF7EB6" : "#636363"}}>{folder.name}</p>
                        )}
                    </FolderBox>
                    <MoreWrap
                        ref={openMenuId === folder.id ? menuRef : undefined}
                    >
                        <MoreButton
                            onClick={(e) => {
                                e.stopPropagation(); // 버블링(다른 부모 요소의 클릭 동작이 같이 실행되는 걸 방지)
                                setOpenMenuId(openMenuId === folder.id ? null : folder.id);
                            }}
                        >
                            ⋮
                        </MoreButton>
                        {openMenuId === folder.id && (
                            <FolderMenu
                                onRename={() => startRename(folder)} 
                                onDelete={() => { onDeleteFolder(folder.id); setOpenMenuId(null); }}
                            />
                        )}
                    </MoreWrap>
                </FolderRow>
            ))}

            {isAdding ? (
                <FolderRow>
                    <AddingBox>
                        <Img src={folderIcon}/>
                        <FolderNameInput
                            autoFocus
                            placeholder="폴더 이름을 입력하세요"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddSubmit();
                                if (e.key === "Escape") { setIsAdding(false); setNewFolderName(""); }
                            }}
                            onBlur={handleAddSubmit}
                        />
                    </AddingBox>
                </FolderRow>
            ) : (
                <AddText onClick={() => setIsAdding(true)}>
                    <Img src={plusIcon}/>
                    <p style={{color:"#636363",fontSize:"16px"}}>그룹 추가하기</p>
                </AddText>
            )}
        </Body>
    )
}
const Body = styled.div`
    width:300px;
    height:550px;
    background-color:#FDFDFC;
    border-right:#dadada solid 3px;

    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;
`
const AllBox = styled.div<BoxProps>`
    width:85%;
    height:65px;
    background-color:#fdfdfd;
    border-radius:15px;

    display:flex;
    align-items:center;
    gap:10px;    
`
const Img = styled.img`
    width:40px;
    margin-left:30px;
`
const FolderRow = styled.div<BoxProps>`
    width:85%;
    height:65px;
    position:relative;
    display:flex;
    align-items:center;
    overflow:visible;
    background-color: ${({ selected }) =>
    selected ? "#FFC4DE" : "#FDFDFC"};
    border-radius: 15px;
`
const MoreWrap = styled.div`
    position:relative;
    width:24px;
    height:24px;
    flex-shrink:0;
    margin-right:10px;
    overflow:visible;
`
const MoreButton = styled.div`
    width:24px;
    height:24px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#999;
    font-size:18px;
    cursor:pointer;
    border-radius:50%;
`
const AddText = styled.div`
    width:85%;
    height:50px;
    display:flex;
    align-items:center;
    gap:10px;
    cursor: pointer;
`
const AddingBox = styled.div`
    flex:1;
    height:65px;
    display:flex;
    align-items:center;
    gap:10px;
`
const FolderNameInput = styled.input`
    width:100%;
    height:30px;
    border:none;
    outline:none;
    font-family:inherit;
    font-size:18px;
    color:#636363;
    background:transparent;
    &::placeholder{
        color:#636363;
    }
`
const RenameInput = styled.input`
    width:100%;
    height:30px;
    border:none;
    outline:none;
    font-family:inherit;
    font-size:16px;
    color:#636363;
    background:transparent;
`
const FolderBox = styled.div`
    flex:1;
    height: 65px;
    font-size:18px;

    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`