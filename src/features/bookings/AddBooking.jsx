import { useDarkMode } from "../../context/DarkModeContext"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateBookingForm from "./CreateBookingForm"

function AddBooking() {
    // const {isDarkMode} = useDarkMode()
    return (
        <Modal>
            <Modal.Open opensWindowName = "createupdatebooking" />
            <Modal.Window name = "createupdatebooking">
                <CreateBookingForm/>
            </Modal.Window>
        </Modal>
    )
}

export default AddBooking
