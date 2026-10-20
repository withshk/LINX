import styled from "@emotion/styled";
import folderEditIcon from "../../assets/folderEditIcon.svg"
import defaultIcon from "../../assets/trashIcon.svg"

interface LinkSettingProps{
    onDelete : ()=>void;
    onEdit : ()=>void;
}
export function LinkSetting({onDelete,onEdit}:LinkSettingProps){
    return (
        <Body>
                <EditBox
                onClick={onEdit}>
                    <img src={folderEditIcon}/>
                    <p>링크 수정</p>
                </EditBox>
                <Sun></Sun>
                <DeBox
                onClick={onDelete}>
                    <img 
                    style={{width:"15px"}}
                    src={defaultIcon}/>
                    <p style={{color:"#ff0000"}}>링크 삭제</p>
                </DeBox>
            
        </Body>
    )
}
const Body = styled.div`
    width:150px;
    height:100px;
    background-color:#fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    border-radius:10px;
    position:absolute;
    right:1px;
    top:1px;
    z-index:11;

    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    cursor:pointer;
    
`
const EditBox = styled.div`
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:5px;
    cursor: pointer;
    &:hover{
        background-color:#ededed;
    }
    

`

const Sun = styled.div`
    width:80px;
    height:0px;
    border:#DADADA solid 1px;
    
`
const DeBox = styled.div`  
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:5px;
    cursor: pointer;
    &:hover{
        background-color:#ededed;
    }
    
`