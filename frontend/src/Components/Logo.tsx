import styled from "@emotion/styled";

import logo from '../assets/logo.png';
import profil from '../assets/profil.png';

import '../css/AllMargin.css';


export function Logo() {
    return(
        <Body>
            <img className="logo" src={logo} alt="로고"/>
            <Linx>Linx</Linx>
            <img className="profil" src={profil} alt="프로필"/>
            <LinxText>링크를 더 쉽게, 간편하게 저장</LinxText>
        </Body>
    )
}
const Body = styled.div`
    
`
const Linx = styled.div`
    font-size:100px;
    position:absolute;
    top:43%;
    left:23%;
`
const LinxText = styled.div`
    color:#FF7EB6;
    font-size:18px;
    position:absolute;
    top:60%;
    left:13%;
    `