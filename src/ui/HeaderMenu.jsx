import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import Logout from "../features/authentication/Logout"
import { useNavigate } from "react-router-dom"
import { HiOutlineUser } from "react-icons/hi2"
import DarkModeToggle from "./DarkModeToggle"

const StyledList = styled.ul`
    display: flex;
    gap: 0.75rem;
`
function HeaderMenu() {
    const navigate = useNavigate()
    return (
        <StyledList>
            <li>
                <ButtonIcon onClick = {() => navigate("/account")}>
                    <HiOutlineUser style={{height: "3rem", width: "6rem", marginTop: "1rem"}}/>
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledList>
    )
}

export default HeaderMenu
