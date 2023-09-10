import Button from "../../ui/Button"
import {StyledConfirmDelete as StyledConfirm} from "../../ui/ConfirmDelete"
function ConfirmLogout({disabled, closeModal, onConfirm}) {
    return (
        <StyledConfirm>
            <p>
                Are you sure you want to Logout?
            </p>
            <div>
                <Button variation="secondary" disabled={disabled} onClick={() => closeModal()}>
                Cancel
                </Button>
                <Button disabled={disabled} onClick={() => onConfirm()}>
                Logout
                </Button>
            </div>
            
        </StyledConfirm>
    )
}

export default ConfirmLogout
