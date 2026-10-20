import styled from "@emotion/styled";

interface FolderMenuProps {
    onRename: () => void;
    onDelete: () => void;
}
export function FolderMenu({ onRename, onDelete }: FolderMenuProps) {
    return (
        <Body onClick={(e) => e.stopPropagation()}>
            <MenuItem onClick={onRename}>이름 변경</MenuItem>
            <MenuItem onClick={onDelete} style={{ color: "#ff0000" }}>삭제</MenuItem>
        </Body>
    );
}
const Body = styled.div`
    width: 110px;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 28px;
    z-index: 20;

    display: flex;
    flex-direction: column;
    padding: 6px 0;
`
const MenuItem = styled.div`
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: #ededed;
    }
`