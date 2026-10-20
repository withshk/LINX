import styled from "@emotion/styled";
import hambugerIcon from "../../assets/hamberger.svg"
import bocsaIcon from "../../assets/boksaIcon2.svg"
import goIcon from "../../assets/goIcon2.svg"
import gojung from "../../assets/gojung.svg"
import fullgojung from "../../assets/fullgojung.svg"
import { LinkSetting } from "./LinkSetting";
import { useEffect, useRef, useState } from "react";

interface Link{
    url:string;
    title:string;
    memo:string|null;
    img:string|null;
    pinned:boolean;
    clickCount:number; // 타입 선언
}
interface LinkBoxProps{
    link:Link;
    onDelete : ()=>void;
    onEdit : () =>  void;
    onTogglePin : () => void;
    onClickLink? : () => void; 
}
export function LinkBox({link,onDelete,onEdit,onTogglePin,onClickLink}:LinkBoxProps) {
    const [isSetting,setIsSetting] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);
    const copy = () => {
        navigator.clipboard.writeText(link.url);
        alert("링크가 복사되었습니다")
    }
    const Link = () => { // 주의: 위에 선언한 interface Link랑 이름이 완전히 같음. 타입이랑 값(함수)은 이름공간이 달라서 에러는 안나지만 나중에 헷갈리기 딱 좋은 부분(함수명 바꾸는게 나을듯)
        window.open(link.url,"_blank");
        onClickLink?.();
        setIsSetting(false);
    }
    useEffect(() => {
        if (!isSetting) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
                setIsSetting(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSetting]);
    return(
        <Body
        ref={boxRef}
        onClick={()=>setIsSetting(false)}>
            
            <Box onClick={Link}>
                
                {link.img && (
                <LinkImage src={link.img} alt="링크 이미지" />
                )}
                <Img></Img>
                <TitleBox>
                    <Title>{link.title}</Title>
                    <Memo>{link.memo}</Memo>
                </TitleBox>
                <ClickCount>클릭 {link.clickCount}회</ClickCount>
            </Box>
            <LinkGojung
                onClick={(e)=>{
                    e.stopPropagation();
                    onTogglePin();
                }}>
                {link.pinned ? (
                    <img src={fullgojung}/>
                ): ( 
                    <img src={gojung}/>
                )}
            </LinkGojung>
            <HambugerIcon
                onClick={(e) => {
                e.stopPropagation();
                setIsSetting(true);
            }}>
                <img src={hambugerIcon}
                style={{width:"5px"}}></img>
            </HambugerIcon>
            { isSetting &&(
                <LinkSetting
                onDelete={onDelete}
                onEdit={onEdit}/>
            ) }
            <BocsaIcon
            onClick={copy}>
                <img src={bocsaIcon}
                style={{width:"25px"}}/>
                </BocsaIcon>    
            <GoIcon
            onClick={()=>{
                window.open(link.url,"_blank");
                onClickLink?.();
            }}>
                <img src={goIcon}
                style={{width:"25px"}}/>
            </GoIcon>
        </Body>
    )
}
const Body = styled.div`
    width:350px;
    height:250px;
    background-color:#fff;
    border:solid 3px #DADADA;
    border-radius:20px;

    display:flex;
    align-items:center;
    position:relative;
`
const Title = styled.div`
    color:#000;
    font-size:20px;
`
const Memo = styled.div`
    color:#636363;
    font-size:16px;
`
const Img = styled.div`
    
`
const Box = styled.div`
    width:100%;
    height:100%;
    display:flex;
    
    margin-left:20px;
    margin-top:40px;
    flex-direction:column;
    gap:5px;
`
const LinkImage = styled.img`
    width: 80px;;
    height: 80px;
    object-fit: cover;
    border-radius: 20px;
`
const ClickCount = styled.div`
    color:#B0B0B0;
    font-size:14px;
    margin-top:10px;
`
const TitleBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
`
const HambugerIcon = styled.div`
    position:absolute;
    right:10px;
    top:10px;
    width:30px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
`
const BocsaIcon = styled.div`
    position:absolute;
    right:50px;
    bottom:10px;
    cursor: pointer;
`
const GoIcon = styled.div`
    position:absolute;
    right:20px;
    bottom:10px;
    cursor: pointer;
`
const LinkGojung = styled.div`
    position:absolute;
    right:35px;
    top:10px;
    width:30px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    img{
        width:120px;
    }
`