import styled from "@emotion/styled";

import email from '../../assets/email.svg'
import { TextBox } from "../TextBox";

interface EmailInputProps{
    value:string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmailInput({value, onChange}:EmailInputProps){
    return(
        <Body>
            <SignUpText>회원가입 하고 모든 기능을 사용해보세요.</SignUpText>
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
        </Body>
    )
}

const Body = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
`
const SignUpText = styled.div`
    font-size:16px;
    color:#989898;
`
const Emailinput = styled.div`
    
`
const Email = styled.div`
    
`
const Img = styled.img`
    width:40px;
    margin:0 0 0 10px;
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