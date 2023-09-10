import styled from "styled-components"
import Button from "../../ui/Button"

import Modal from "../../ui/Modal"
import ConfirmLogout from "./ConfirmLogout"
import UseLogout from "./UseLogout"


const LogoutLaylout = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem 3rem;
`
function Logout() {
    const {isLoggingOut, logout} = UseLogout()
    return (
        <Modal>
            <Modal.Open opensWindowName= "logout">
                <LogoutLaylout>
                    <Button>
                        Log out
                    </Button>
                </LogoutLaylout>
            </Modal.Open>
            <Modal.Window name= "logout">
                <ConfirmLogout disabled={isLoggingOut} onConfirm={logout}/>
            </Modal.Window>
        </Modal>
    )
}

export default Logout
