import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface IdCodeButtonProps {
    onLoginClick?: () => void;
    onVerify: () => void;
}

export function IdCodeButton({onLoginClick, onVerify }: IdCodeButtonProps) {
    const navigate = useNavigate();

    const goLogIn=()=>{
        onLoginClick?.();
        navigate("/LogIn");
    }
    return (
        <All>
            <Body onClick={onVerify}>
                <Text>인증하기</Text>
            </Body>
            <Explanation>
                <AfterSignUp>이미 회원이신가요?</AfterSignUp>
                <LogIn onClick={goLogIn}
                >로그인</LogIn>
            </Explanation>
        </All>
    )
}
// styled-components는 그대로 유지
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