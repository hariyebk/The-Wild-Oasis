import { useDarkMode } from "../../context/DarkModeContext"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateBookingForm from "./CreateBookingForm"

function AddBooking() {
    const {isDarkMode} = useDarkMode()
    return (
        <Modal>
                <Modal.Open opensWindowName = "cabin-form">
                    <Button size = "medium" variation = {isDarkMode ? "special": "primary"}> New </Button>
                </Modal.Open>
                <Modal.Window name = "cabin-form">
                    <CreateBookingForm/>
                </Modal.Window>
        </Modal>
    )
}

export default AddBooking
