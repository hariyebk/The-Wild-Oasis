import styled from "styled-components";
import { HiXMark } from "react-icons/hi2"
import Spinner from "./Spinner";
import { createPortal } from "react-dom";


const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
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


function Modal({children, onClose}) {
  // Portals in React provide a way to render a component's content into a different part of the DOM hierarchy, outside of its parent component. This can be useful in various scenarios where you need to render content at a different DOM location than the component's usual position. Portals are commonly used for creating modals, overlays, or pop-up components. These components often need to be rendered at the top level of the DOM hierarchy to ensure they appear on top of other content and are not affected by the component's z-index stacking context.
  
    return createPortal(
      <Overlay>
        <StyledModal>
        <Button onClick = {() => onClose(false)}>
            <HiXMark />
        </Button>
          {children}
        </StyledModal>
      </Overlay>,
      document.body
    )
}

export default Modal
