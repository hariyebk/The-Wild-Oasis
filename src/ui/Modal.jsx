import styled, { css } from "styled-components";
import { HiXMark } from "react-icons/hi2"
import { createPortal } from "react-dom";
import {createContext, useContext, useState, cloneElement} from "react"
import useOnClickOutside from "../hooks/useOnClickOutside";

export const StyledModal = styled.div`
position: fixed;
top: 48%;
left: 50%;
transform: translate(-50%, -50%);
box-shadow: ${props => props.type === "spinner" ? "none": "var(--shadow-lg)"};
background:  ${props => props.type === "spinner" ? "none": "var(--color-grey-0)"};
border-radius: var(--border-radius-lg);
padding: 3.2rem 4rem;
transition: all 0.5s;

`;

export const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: var(--backdrop-color);
backdrop-filter: blur(4px);
z-index: 1000;
transition: all 0.5s;
`;

const Button = styled.button`
background: none;
border: none;
padding: 0.4rem;
border-radius: var(--border-radius-sm);
transform: translateX(0.8rem);
transition: all 0.2s;
position: absolute;
top: 1.2rem;
right: 1.9rem;

&:hover {
    background-color: var(--color-grey-100);
}

& svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
}
`;


const ModalContext = createContext()

function Modal({children}) {
    const [openName , setOpenName] = useState("")
    // Event Handlers
    const closeModal = () => setOpenName("")
    const openModal = setOpenName

    return <ModalContext.Provider value = {{openName, openModal, closeModal}}>
        {children}
    </ModalContext.Provider>
}

function Open ({children, opensWindowName}){
    const {openModal} = useContext(ModalContext)
    // if(opensWindowName === "createupdatebooking") return openModal(opensWindowName)
    // Clones the children element and passes a new prop onClick.
    if(children){
        return cloneElement(children, {onClick: () => openModal(opensWindowName)})
    }
    else{
        return openModal(opensWindowName)
    }
}
function Window({children, name}){
    const {openName, closeModal} = useContext(ModalContext)
    const {ref} = useOnClickOutside(closeModal)
    // Portals in React provide a way to render a component's content into a different part of the DOM hierarchy, outside of its parent component. This can be useful in various scenarios where you need to render content at a different DOM location than the component's usual position. Portals are commonly used for creating modals, overlays, or pop-up components. These components often need to be rendered at the top level of the DOM hierarchy to ensure they appear on top of other content and are not affected by the component's z-index stacking context.
    if(openName !== name) return
    return createPortal(
        <Overlay>
            <StyledModal ref = {ref}>
                {name === "edit-cabin" ? cloneElement(children, {closeEditForm: closeModal}) : cloneElement(children, {closeModal: closeModal})}
                {/* {name === "cabin-form" ? cloneElement(children, {setIsModalOpen: closeModal}): name === "confirm-delete" || name === "delete-booking" || "logout" || "delete-guest" || "newguest" ? cloneElement(children, {closeModal: closeModal}): cloneElement(children, {setEditShowForm: closeModal})}  */}
            </StyledModal>
        </Overlay>,
        document.body
    )
}
function Loader({children}){
    return (
        <Overlay>
            {children}
        </Overlay>
    )
}

Modal.Open = Open
Modal.Window = Window
Modal.Loader = Loader

export {ModalContext}
export default Modal
