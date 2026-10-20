import styled from "@emotion/styled";
import { useState } from "react";

export function Profile(){
    const [img] = useState<string | null>(() => localStorage.getItem("profileImg"));
    return(
        <Body>
            {img && (
                <img
                src={img}
                alt="profile"
                style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}/>
            )}
        </Body>
    )
}
const Body = styled.div`
    background-color:#000;
    border-radius:50%;
    width:90px;
    height:90px;
    overflow:hidden;
`