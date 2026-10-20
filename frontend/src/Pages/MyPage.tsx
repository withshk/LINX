import styled from "@emotion/styled";
import '../css/AllMargin.css'

import { ProfileBox } from '../Components/MyPage/ProfileBox'
import { StatsSummary } from '../Components/MyPage/Statssummary'
import { MiniLogoBox } from "../Components/MiniLogo";

export function MyPage() {
    return (
        <Div>
            <MiniLogoBox/>
            <Content>
                <ProfileBox/>
                <StatsSummary/>
            </Content>
        </Div>
    )
}
const Div = styled.div`
    width:65%;
    min-height:100vh;
    margin:0 auto;
    background-color:#FDFDFC;
    
    display:flex;
    justify-content:center;
    align-items:center;
    padding:40px 0;
    box-sizing:border-box;
`
const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
    width:100%;
`