import styled from "@emotion/styled";

interface BackgroundBoxProps {
    children: React.ReactNode;
}
export function BackgroundBox({ children }: BackgroundBoxProps) {
    return(
        <Body>
            {children}
        </Body>
    )
}
const Body = styled.div`
    width:480px;
    height: 620px;
    background-color:#ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: absolute;
    right: 13%;
    border-radius: 20px;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
`