import styled from "@emotion/styled";
import MiniLogo from "../assets/minilogo.svg"
import { useNavigate } from "react-router-dom";

export function MiniLogoBox() {
    const navigate = useNavigate();

    const GoHome=()=>{
        navigate("/MainPage")
    }
    return (
        <Img 
        src={MiniLogo}
        onClick={GoHome}></Img>
    )
}
const Img = styled.img`
    width:70px;

    position:absolute;
    top:10px;
    left:10px;
`   