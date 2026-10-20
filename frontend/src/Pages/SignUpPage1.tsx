import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import '../css/AllMargin.css'

import { EmailBackgroundBox } from "../Components/SignUp/EmailBackgroundBox";
import { EmailText } from "../Components/SignUp/EmailText";
import { EmailInput } from "../Components/SignUp/EmailInput";
import { Logo } from "../Components/Logo"
import { EmailButton } from "../Components/SignUp/EmailButton"
import { useState } from "react";
import { api } from "../api/client";

export function SignUpPage1() {
    const [email, setEmail] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSendCode = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            setError("올바른 이메일 형식을 입력해주세요");
            return;
        }
        try {
            await api.sendEmailCode(email);
        } catch (e) {
            setError((e as Error).message); // 이미 가입된 이메일 등 서버 에러 표시
            return;
        }
        setError("");
        navigate("/SignUp/step2", { state : {email} });
        
    }

    return(
        <Body>
            <Logo/>
            <EmailBackgroundBox>
                <EmailText/>
                <Div>
                    
                    <EmailErrorText>
                        <EmailInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        {error && <ErrorText>{error}</ErrorText>}
                    </EmailErrorText>
                    <EmailButton onClick={handleSendCode}/>
                </Div>
            </EmailBackgroundBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background: linear-gradient(110deg, #ffffff 1%, #f9bed8 100%);

    display:flex;
    align-items:center;
    gap:100px;
`
const Div = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    gap:40px;
`
const ErrorText = styled.div`
    color: #FF4444;
    font-size: 13px;
`
const EmailErrorText = styled.div`
    display:flex;
    justify-content:center;
    align-self: flex-start;
    flex-direction:column;
    gap:10px;
`