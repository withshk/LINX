import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MiniLogoBox } from "../Components/MiniLogo"
import { FolderCollection } from "../Components/main/FolderCollection"
import { SearchBox } from "../Components/main/SearchBox";
import { Profile } from "../Components/main/Profile";
import { useNavigate } from "react-router-dom";
import type {Folder, Link} from  "../Components/types/link"
import { api } from "../api/client";


export function MainPage () {
    const navigate = useNavigate(); // 클릭시 다른 페이지로 이동

    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<number | "all">("all"); // 폴더 목록
    const [links, setLinks] = useState<Link[]>([]); //저장된 링크 목록

    const fail = (e: Error) => alert(e.message);

    useEffect(() => {
        // 로그인한 유저의 폴더/링크를 서버에서 불러온다 (로그인 안 돼있으면 client가 로그인 페이지로 보냄)
        api.getFolders().then(setFolders).catch(fail);
        api.getLinks().then(setLinks).catch(fail);
    }, []);

    const replaceLink = (updated: Link) =>
        setLinks(prev => prev.map(link => (link.id === updated.id ? updated : link))); // id가 같은 링크만 서버가 준 최신 정보로 교체

    // 이미지 파일이 있으면 링크 저장 후 업로드하고, 서버가 준 이미지 주소로 바꿈
    // 업로드만 실패하면 링크는 이미 저장됐으니 이미지 없이 그대로 보여줌
    const withImage = async (link: Link, imgFile: File | null) => {
        if (!imgFile) return link;
        try {
            return { ...link, img: await api.uploadLinkImage(link.id, imgFile) };
        } catch (e) {
            fail(e as Error);
            return link;
        }
    };

    const handleAddFolder = (name: string) => {
        api.createFolder(name).then(folder => setFolders(prev => [...prev, folder])).catch(fail);
    };

    const handleAddLink = (link: Omit<Link, "id" | "clickCount" | "createdAt">, imgFile: File | null) => {
        api.createLink(link)
            .then(created => withImage(created, imgFile))
            .then(created => setLinks(prev => [...prev, created]))
            .catch(fail);
    };

    const handleClickLink = (id: number) => {
        api.clickLink(id).then(replaceLink).catch(fail);
    };

    const handleEditLink = (updated: Link, imgFile: File | null) => {
        api.updateLink(updated.id, updated)
            .then(saved => withImage(saved, imgFile))
            .then(replaceLink)
            .catch(fail);
    };

    const handleDeleteLink = (id: number) => {
        api.deleteLink(id).then(() => setLinks(prev => prev.filter(link => link.id !== id))).catch(fail);
    };

    const handleMoveFolder = (id: number, folderId: number | null) => {
        const link = links.find(l => l.id === id);
        if (link) api.updateLink(id, { ...link, folderId }).then(replaceLink).catch(fail);
    };

    const handleTogglePin = (id: number) => {
        api.togglePin(id).then(replaceLink).catch(fail);
    }; // 고정/고정해제 토글

    const handleRenameFolder = (id: number, name: string) => {
        api.renameFolder(id, name)
            .then(() => setFolders(prev => prev.map(folder => (folder.id === id ? { ...folder, name } : folder))))
            .catch(fail);
    };

    const handleDeleteFolder = (id: number) => {
        api.deleteFolder(id).then(() => {
            setFolders(prev => prev.filter(folder => folder.id !== id));
            setLinks(prev => prev.map(link => (link.folderId === id ? { ...link, folderId: null } : link))); // 서버도 폴더 삭제 시 안에 있던 링크의 폴더를 비움
            setSelectedFolder(prev => (prev === id ? "all" : prev)); // 보고있던 폴더가 삭제되면 전체보기로
        }).catch(fail);
    }; // 폴더 삭제 

    const handleGoProfile=()=>{
        navigate("/MyPage")
    }
    return(
        <Body>
            <MiniLogoBox/>
            <FolderCollection
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={setSelectedFolder}
                onAddFolder={handleAddFolder}
                onRenameFolder={handleRenameFolder}
                onDeleteFolder={handleDeleteFolder}
            />
            <Box>
                <SearchBox
                    links={links}
                    folders={folders}
                    selectedFolder={selectedFolder}
                    onAddLink={handleAddLink}
                    onEditLink={handleEditLink}
                    onDeleteLink={handleDeleteLink}
                    onMoveFolder={handleMoveFolder}
                    onTogglePin={handleTogglePin}
                    onClickLink={handleClickLink}
                />
            </Box>
            <ProfilBox
            onClick={handleGoProfile}>
                <Profile/>
            </ProfilBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background-color:#FDFDFC;
    overflow:hidden;

    display:flex;
    justify-content:space-between;
    align-items:center;
`
const Box = styled.div`
    width:1150px;
    height:670px;
    
    position:absolute;
    left:22%;
    top:120px;
    
`
const ProfilBox = styled.div`
    position:absolute;
    right:30px;
    top:30px;
`