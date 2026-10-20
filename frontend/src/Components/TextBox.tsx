import styled from "@emotion/styled";

interface TextBoxProps{
    children?: React.ReactNode;
}
export function TextBox({ children }: TextBoxProps) {
    return(
        <div>
            <Box>
                {children}
            </Box>
        </div>
    )
}
const Box = styled.div`
    color:#fff;
    border: 3px solid #ececec;
    width:350px;
    height: 55px;
    border-radius: 10px;
    display:flex;
`