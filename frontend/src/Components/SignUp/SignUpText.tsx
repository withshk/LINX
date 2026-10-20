import styled from "@emotion/styled";
import { useState } from "react";

import { TextBox } from "../TextBox";
import { SignUpButton } from "./SignUpbutton";

import name from "../../assets/name.svg"
import { PassWordInput } from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";

interface SignUpTextProps {
    email: string;
}

export function SignUpText({ email }: SignUpTextProps) {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            await api.signup({ email, username: nickname, password, passwordConfirm: passwordCheck });
            navigate("/LogIn");
        } catch (e) {
            alert((e as Error).message);
        }
    }

    return(
        <Body>
            <div>
                <SignUptext>회원가입</SignUptext>
                <SignUpExplanation>회원가입 하고 모든 기능을 사용해보세요.</SignUpExplanation>
            </div>
            <Div>
                <TextBoxAll>
                <Box>
                    <Title>닉네임</Title>
                    <TextBox>
                        <Logo src={name}/>
                        <Input
                        placeholder="닉네임을 입력하세요."
                        value={nickname}
                        onChange={(e)=>setNickname(e.target.value)}/>
                    </TextBox>
                </Box>
                
            </TextBoxAll>
            <PassWordInput password={password} setPassword={setPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck}/>
            </Div>
            <SignUpButton onSignUp={handleSignUp}/>
        </Body>
    )
}
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    `
const Div = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 25px;
    `
const SignUptext = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: center;
    text-align: center;

`
const SignUpExplanation = styled.div`
    display: flex;
    color: #989898;
    font-size: 16px;
    text-align: center;
    justify-content:center;
    margin-top:10px;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap:5px;
`
const Title = styled.div`
    color:#000;
    font-size: 16px;
`
const Logo = styled.img`
    width: 50px;
`

const Input = styled.input`
    font-size: 16px;
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    background:none;
    &::placeholder {
        color: #bcbcbc;
        font-size: 16px;
    }
`
const TextBoxAll = styled.div`
    display: flex;
    flex-direction:column;
    gap: 25px;
`