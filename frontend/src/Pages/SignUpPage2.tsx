import styled from "@emotion/styled";

import "../css/AllMargin.css";

import { Logo } from '../Components/Logo';
import { IdCodeBackgroundBox } from "../Components/SignUp/IdCodeBackgroundBox";
import { EmailText } from "../Components/SignUp/EmailText";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/client";
import type { SignUpState } from "../Components/types/SignUp";
import { IdCode } from "../Components/SignUp/IdCode";
import { IdCodeButton } from "../Components/SignUp/IdCodeButton";

export function SignUpPage2() {
    const location = useLocation(); // react-router-dom이 지원하는 훅(정보 전체 전달)
    const {email} = (location.state as SignUpState) ??  {email:""};
    // 타입을 email:string이 맞다고 정의 | 왼쪽 값이 null이면 오른쪽값을 넣어 오류 발생 방지
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            await api.confirmEmailCode(email, code);
            navigate("/SignUp/step3", { state: { email } });
        } catch (e) {
            alert((e as Error).message);
        }
    }
    const handleResend = () => {
        api.sendEmailCode(email).catch((e) => alert(e.message));
    }

    return(
        <Body>
            <Logo/>
            <IdCodeBackgroundBox>
                <Body1>
                    <EmailText/>
                    <Div>
                        <EmailInfoText>{email}</EmailInfoText>
                        <div>위 이메일로 인증번호를 보냈어요.</div>
                    </Div>
                </Body1>
                <IdCode onChange={setCode} onResend={handleResend}/>
                <IdCodeButton onVerify={handleVerify}/>
            </IdCodeBackgroundBox>
        </Body>
    )
}
const Body = styled.div`
    width:100%;
    height:100vh;
    background: linear-gradient(110deg, #ffffff 1%, #f9bed8 100%);
    
    display:flex;
    justify-content:center;
    align-items:center;   
    
`
const EmailInfoText = styled.div`
    color:#FF7EB6;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column; 
    color:#989898;
    
`
const Body1 = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:10px;
`