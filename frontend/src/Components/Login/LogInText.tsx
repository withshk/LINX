import styled from "@emotion/styled";
import email from "../../assets/email.svg"
import { TextBox } from "../TextBox";
import openEyes from "../../assets/openEyes.svg"
import closeEyes from "../../assets/closeEyes.svg"
import password from "../../assets/password.svg"
import { useState } from "react";

interface LogInTextProps{
    value:string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    password:string;
    onPasswordChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}


export function LogInText({value, onChange, password: Password, onPasswordChange}:LogInTextProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    return(
        <Body>
            <div>
                <SignUptext>로그인</SignUptext>
                <SignUpExplanation>로그인 하고 모든 기능을 사용해보세요.</SignUpExplanation>
            </div>
            <Emailinput>
                <Email>이메일</Email>
                <TextBox>
                    <Img src={email}></Img>
                    <Input 
                    type="email"
                    value={value}
                    onChange={onChange}
                    placeholder = "이메일을 입력하세요"></Input>
                </TextBox>
            </Emailinput>
            <PasswordInput>
                <Email>비밀번호</Email>   
                <TextBox>
                    <PassWordImg src={password}/>
                    <Input 
                        type={showPassword? "text" : "password"} // ture면 type=text false면 type=password를 출력
                        value={Password}
                        onChange={onPasswordChange}
                        placeholder="비밀번호를 입력하세요."
                    />
                    <EyesIcon
                        src={showPassword ? openEyes : closeEyes}
                        onClick={()=>setShowPassword(!showPassword)}
                    />
                    </TextBox>
            </PasswordInput>
            
        </Body>
    )
}
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

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

const Emailinput = styled.div`
    
`
const PasswordInput = styled.div`
    
`
const Email = styled.div`
    
`
const Img = styled.img`
    width:30px;
    margin:0 10px 0 10px;
`
const Input = styled.input`
    width:100%;
    border:none;
    outline:none;
    font-family:inherit;
    font-size:16px;
    margin-left:10px;
    background:none;

`
const PassWordImg = styled.img`
    width: 30px;
    margin-left:10px;
    margin-right:10px;
`
const EyesIcon = styled.img`
    width: 30px;
    margin-left:10px;
    margin-right:10px;
`  