import styled from "@emotion/styled"
import '../css/AllMargin.css'

import { useLocation } from "react-router-dom"
import { Logo } from "../Components/Logo"
import { BackgroundBox } from "../Components/BackgroundBox"
import { SignUpText } from "../Components/SignUp/SignUpText"   

export function SignUpPage3() {
    const location = useLocation();
    const { email } = (location.state as { email?: string; code?: string }) ?? {};

    return(
        <Body>
            <Logo/>
            <BackgroundBox>
                <SignUpText email={email ?? ""}/>
            </BackgroundBox>
            
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