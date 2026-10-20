import styled from "@emotion/styled";
import { useState } from "react";

import openEyes from "../../assets/openEyes.svg"
import closeEyes from "../../assets/closeEyes.svg"
import password from "../../assets/password.svg"

import { TextBox } from "../TextBox";

interface PassWordInputProps {
    password: string;
    setPassword: (value: string) => void;
    passwordCheck: string;
    setPasswordCheck: (value: string) => void;
}

export function PassWordInput({ password: Password, setPassword, passwordCheck, setPasswordCheck }: PassWordInputProps){
    const [showPassword, setShowPassword] = useState(false);
    const [reShowPassword, setReShowPassword] = useState(false);

    const isMetched = Password === passwordCheck;
    const isTouched = passwordCheck.length > 0 ;

    const passwordNorz = /^(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/ //비밀번호 유효성 검사를 위한 정규식
    const isPasswordTrue = passwordNorz.test(Password);
    const isPasswordTouched = Password.length > 0;

    return(
        <Div>
            <AllBox>
                <Text>비밀번호
                    </Text>
                <TextBox>
                    
                    <PassWordImg src={password}/>
                    <Input 
                        type={showPassword? "text" : "password"} // ture면 type=text false면 type=password를 출력
                        value={Password}
                        onChange={(e)=>setPassword(e.target.value)} //Password의 값을 업데이트 
                        placeholder="비밀번호를 입력하세요."
                    />
                    <EyesIcon
                        src={showPassword ? openEyes : closeEyes}
                        onClick={()=>setShowPassword(!showPassword)}
                    />
                </TextBox>
                {isPasswordTouched && !isPasswordTrue &&(
                    <p style={{color:'red', fontSize:'13px'}}>비밀번호는 특수문자 포함 8자 이상, 20자 이하여야합니다.</p>
                )}
            </AllBox>
            <AllBox>
                <Text>비밀번호 확인
                    </Text>
                <TextBox>
                    
                    <PassWordImg src={password}/>
                    <Input 
                        type={reShowPassword? "text" : "password"}
                        value={passwordCheck}
                        onChange={(e)=>setPasswordCheck(e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요."
                    />
                    <EyesIcon
                        src={reShowPassword ? openEyes : closeEyes}
                        onClick={()=>setReShowPassword(!reShowPassword)}
                    />
                </TextBox>
                {isTouched && !isMetched &&(
                    <p style={{color:'red',fontSize:'13px'}}>비밀번호가 일치하지 않습니다.</p>
                )}{isTouched && isMetched && (
                    <p style={{color: 'green', fontSize:'13px'}}>비밀번호가 일치합니다.</p>
                )}
            </AllBox>
            
        </Div>
    )
}
const Div = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 25px;
    `
const AllBox = styled.div`
    display: flex;
    flex-direction: column;
    gap:5px;
    `
const Text = styled.div`
    color:#000;
    font-size: 16px;
`
const PassWordImg = styled.img`
    width: 30px;
    margin-left:10px;
    margin-right:10px;
`
const Input = styled.input`
    font-size: 16px;
    flex: 1;
    border: none;
    outline: none;
    font-family:inherit;
    &::placeholder {
        color: #bcbcbc;
    }
`
const EyesIcon = styled.img`
    width: 30px;
    margin-left:10px;
    margin-right:10px;
`  