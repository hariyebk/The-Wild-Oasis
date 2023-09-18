import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"
import Button from "../../ui/Button"
import { useDarkMode } from "../../context/DarkModeContext"

function AddCabin() {
    const {isDarkMode} = useDarkMode()
    return <>
    <Modal>
        <Modal.Open opensWindowName = "cabin-form">
            <Button variation = {isDarkMode ? "special" : "primary"} size = "medium" > New </Button>
        </Modal.Open>
        <Modal.Window name = "cabin-form">
            <CreateCabinForm/>
        </Modal.Window>
    </Modal>
    </>
}

export default AddCabin
