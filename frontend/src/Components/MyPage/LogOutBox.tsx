import styled from "@emotion/styled";
import LogoutIcon from "../../assets/logoutIcon.svg"

interface LogOutBoxProps {
    email?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export function LogOutBox({ email, onCancel, onConfirm }: LogOutBoxProps) {
    // 오버레이 클릭 시에도 닫히도록, 내부 클릭은 버블링을 막아서 오버레이 클릭과 구분
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return(
        <Body onClick={onCancel}>
            <LogoutBox onClick={stop}>
                <Img 
                src={LogoutIcon}/>
                <P>
                    <p style={{fontSize:"20px",marginLeft:"30px"}}>로그아웃 하시겠어요?</p>
                    <p style={{fontSize:"16px",marginLeft:"30px",color:"#959595"}}>{email || "이 계정"}에서 로그아웃 돼요. <br/>다시 사용하려면 로그인이 필요해요.</p>
                </P>
                <Button>
                    <CancleButton onClick={onCancel}>취소</CancleButton>
                    <LogoutButton onClick={onConfirm}>로그아웃</LogoutButton>
                </Button>
            </LogoutBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:200vh;
    background-color:rgba(0,0,0,0.4);
    
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    left:0;
`
const LogoutBox = styled.div`
    width:400px;
    height:300px;
    background-color:#fff;
    border-radius:13px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    margin-top:300px;
    gap:20px;
`
const Img = styled.img`
    width:60px;
    margin-left:30px;
`
const P = styled.div`
    display:flex;
    gap:8px;
    flex-direction:column;
`
const Button = styled.div`
    display:flex;
    gap:5px;
    justify-content:center;
`
const CancleButton = styled.div`
    width:165px;
    height:50px;
    background-color:#fff;
    border:solid 2px #CECECE;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#959595;
    cursor: pointer;
`
const LogoutButton = styled.div`
    width:165px;
    height:50px;
    background-color:#fff;
    background-color:#ff2d2d;
    border:solid 2px #ff2d2d;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#a90000;
    cursor: pointer;
`