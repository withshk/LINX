import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface EmailButtonProps{
    onClick?:()=>void;
    onLoginClick?:()=>void;
} // 클릭 하였을때 실행해야 하므로 함수형태로 저장 but 반면에 title이나 email등은 단순히 데이터이므로 string, number등으로 넘긴다. 

export function EmailButton({onClick}:EmailButtonProps) {
    const navigate = useNavigate();

    const goLogIn =()=>{
        onClick?.();
        navigate("/LogIn")
    }
    return(
        <All>
            <Body 
            onClick={onClick}>
                <Text>인증번호 받기</Text>
            </Body>
            <Explanation>
                    <AfterSignUp>이미 회원이신가요?</AfterSignUp>
                    <LogIn
                    onClick={goLogIn}>
                        로그인</LogIn>
            </Explanation>
        </All>
    )
}
const All = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:5px;
    `
const Body = styled.div`
    width:350px;
    height: 55px;
    background-color:#FF7EB6;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
    cursor: pointer;
`
const Text = styled.div`
    color:#fff;
    font-size: 16px;
`
const Explanation = styled.div`
    display:flex;
    flex-direction:row;
    gap:3px;
`
const AfterSignUp = styled.div`
    color:#949494;
    font-size: 13px;
    
`
const LogIn = styled.div`
    color:#FF7EB6;
    font-size: 13px;
    cursor: pointer;
    `