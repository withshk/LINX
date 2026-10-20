import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface LogInButtonProps {
    onLogin: () => void;
}

export function LogInButton({ onLogin }: LogInButtonProps) {

    const navigate = useNavigate();

    const goSignUp=()=>{
        navigate("/SignUp/step1");
    }
    return(
        <All>
            <Body onClick={onLogin}>
                <Text>로그인</Text>
            </Body>
            <Explanation>
                    <AlreadySignUp>아직 회원이 아니신가요?</AlreadySignUp>
                    <SingUp onClick={goSignUp}>회원가입</SingUp>
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
const AlreadySignUp = styled.div`
    color:#949494;
    font-size: 13px;
    
`
const SingUp = styled.div`
    color:#FF7EB6;
    font-size: 13px;
    cursor: pointer;
    `



