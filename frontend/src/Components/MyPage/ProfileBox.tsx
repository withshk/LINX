import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/client";

import pofile from '../../assets/profile.svg'
import profileEdit from '../../assets/profileedit.svg'
import { useNavigate } from "react-router-dom";
import { LogOutBox } from "./LogOutBox";

export function ProfileBox(){
    const [img,setImg] = useState<string | null>(() => localStorage.getItem("profileImg"));
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLogin, setIsLogin] = useState(false);

    const [isTouch,setIsTouch] = useState(false);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameDraft, setNameDraft] = useState(name);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        api.getProfile().then((user) => {
            setEmail(user.email);
            setName(user.username);
        }).catch((e) => alert(e.message));
    }, []);

    const handleLogout = async () => {
        try {
            await api.logout();
        } catch (e) {
            alert((e as Error).message);
            return;
        }
        setIsLogin(false);
        navigate("/LogIn");
    }
    const ImgChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 입력한 파일중 첫번째
        if(!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setImg(dataUrl);
            // 메인페이지 등 다른 화면에서도 쓸 수 있도록 저장
            localStorage.setItem("profileImg", dataUrl);
        };
        reader.readAsDataURL(file);
    }
    const startEditName = () => {
        setNameDraft(name);
        setIsEditingName(true);
        // input이 렌더된 다음 프레임에 포커스
        setTimeout(()=> nameInputRef.current?.focus(), 0);
    }
    const saveName = () => {
        const trimmed = nameDraft.trim();
        const nextName = trimmed || name; // 공백만 입력하고 저장하면 trimmed가 빈 문자열("")이라 falsy로 취급돼서 원래 이름(name)으로 되돌아감. 왜 빈 이름으로 안바뀌는지 처음에 헷갈렸던 부분
        setName(nextName);
        setIsEditingName(false);
        // ponytail: 닉네임 수정 API가 아직 없어서 화면에만 반영됨, 새로고침하면 서버 값으로 돌아감
    }
    const cancelEditName = () => {
        setNameDraft(name);
        setIsEditingName(false);
    }

    return(
        <Body>
            <Profile 
            onClick={()=>inputRef.current?.click()}
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=> setIsHovering(false)}>
                {img ? (
                    <img
                    src={img}
                    alt="profile"
                    style={{width:"100%", height:"100%",objectFit:"cover", borderRadius:"50%"}}/>
                ) : ( 
                    <img style={{width:"70%"}}src={pofile}/> //가짜 프로필 input
                )}
                { isHovering && (
                    <Editemotion>
                        <ProfileEditImg src={profileEdit}/>
                    </Editemotion>
                )}
            </Profile> 
            <ProfileInput
            ref={inputRef}
            type="file" // 진짜 프로필 input
            onChange={ImgChange}></ProfileInput> 
            <NameEmailBox>
                <NameRow>
                    {isEditingName ? (
                        <NameInput
                        ref={nameInputRef}
                        value={nameDraft}
                        onChange={(e)=>setNameDraft(e.target.value)}
                        onBlur={saveName}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter") saveName();
                            if(e.key === "Escape") cancelEditName();
                        }}/>
                    ) : (
                        <>
                            <Name>{name || "닉네임 없음"}</Name>
                            <NameEditIcon
                            src={profileEdit}
                            onClick={startEditName}/>
                        </>
                    )}
                </NameRow>
                <Email>{email}</Email>
            </NameEmailBox>
            <LogoutTextBox
            onClick={()=>setIsLogin(true)}
            onMouseOver={()=>setIsTouch(true)}
            onMouseOut={()=> setIsTouch(false)}
            style={{backgroundColor: isTouch ? '#FF4848':'#fff'
                , border: isTouch ? '#fff 2px solid':'#FF4848 solid 2px',
                color: isTouch ? '#fff' : '#FF4848'
            }}>
                <p style={{fontSize:"15px"}}>로그아웃</p>
            </LogoutTextBox>
            {isLogin && (
                <LogOutBox
                email={email}
                onCancel={()=>setIsLogin(false)}
                onConfirm={handleLogout}/>
            )}
        </Body>
    )
}
const Body = styled.div`
    width:96%;
    max-width:1500px;
    min-width:560px;
    height:220px;
    background-color: #fff;
    border:1.5px solid #EFEFEF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius:20px;

    display:flex;
    justify-content:space-between;
    align-items:center;
    
`
const ProfileInput = styled.input`
    width:150px;
    height:150px;
    background-color:#000;
    margin-left:40px;
    border-radius:50%;
    display:none;
`
const Profile = styled.div`
    width:150px;
    height:150px;
    margin-left:40px;
    border:solid 2px #f3f3f3;  
    border-radius:50%;

    display:flex;
    background-color:#eeeeee;
    justify-content:center;
    align-items:center;

    position:relative;
`
const Editemotion = styled.div`
    width:150px;
    height:150px;
    overflow:hidden;
    background: rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfileEditImg = styled.img`
    display:flex;
    position:absolute;
    width:20px;
`
const NameEmailBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:8px;
    flex:1;
    margin-left:30px;
`
const NameRow = styled.div`
    display:flex;
    align-items:center;
    gap:8px;
`
const Name = styled.div`
    font-size:20px;
    font-weight:700;
    color:#222;
`
const NameEditIcon = styled.img`
    width:16px;
    cursor:pointer;
`
const NameInput = styled.input`
    font-size:20px;
    font-weight:700;
    color:#222;
    border:none;
    outline:none;
    border-bottom:2px solid #FF7EB6;
    font-family:inherit;
    background:none;
    width:200px;
`
const Email = styled.div`
    font-size:14px;
    color:#989898;
`
const LogoutTextBox = styled.div`
    width:100px;
    height:30px;
    
    
    border-radius:50px;
    margin-right:40px;
    
    display:flex;
    justify-content:center;
    align-items:center; 

`