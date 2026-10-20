import styled from "@emotion/styled";
import { BackgroundBox } from "../Components/BackgroundBox";
import { Logo } from '../Components/Logo'
import { LogInText } from '../Components/Login/LogInText'
import { useState } from "react";
import { LogInButton } from "../Components/Login/LogInButton";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export function LogInPage() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await api.login(email, password);
            navigate("/MainPage");
        } catch (e) {
            alert((e as Error).message);
        }
    }
    return(
        <Body>
            <Logo/>
            <BackgroundBox>
                <Div>
                    <div>
                        <LogInText
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        password={password}
                        onPasswordChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                <LoginButton>
                    <LogInButton onLogin={handleLogin}/>
                </LoginButton>
                </Div>
            </BackgroundBox>
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
    gap:100px;
`
const LoginButton = styled.div`
    margin-top:50px;
`