import { useDarkMode } from "../../context/DarkModeContext"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"

function AddNewGuest() {
    const {isDarkMode} = useDarkMode()
    return (
        <Modal>
            <Modal.Open opensWindowName= "newguest">
                    <Button size = "medium" variation = {isDarkMode ? "special": "primary"}> New </Button>
            </Modal.Open>
                <Modal.Window>

                </Modal.Window>
        </Modal>
    )
}

export default AddNewGuest
