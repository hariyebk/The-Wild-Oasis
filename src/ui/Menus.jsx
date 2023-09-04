import styled from "styled-components";
import {createContext, useState, useContext} from "react"
import {HiEllipsisVertical} from "react-icons/hi2"
import { createPortal } from "react-dom";


const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()
function Menus({children}) {
  const [openId , setOpenId] = useState("")
  // Event handlers
  const closeMenu = () => setOpenId("")
  const openMenu = setOpenId

  return <MenusContext.Provider value={{openId, closeMenu, openMenu}}>
            {children}
      </MenusContext.Provider>
}

function Toggle({id}){
  const {openId, closeMenu, openMenu} = useContext(MenusContext)

  const handleClick = () => { 
    openId === "" || openId !== id ? openMenu(id) : closeMenu()
  }

  return <StyledToggle onClick = {handleClick}>
        <HiEllipsisVertical />
  </StyledToggle>

}
function List({children, id}){
  const {openId} = useContext(MenusContext)
  // Display the menu buttons if the current row is clicked
  if(openId !== id) return
  return createPortal (
  <StyledList position = {{x: 20, y: 20}}>
      {children}
  </StyledList>, document.body
  )
}

function Button({children}){
  return (
    <li>
      <StyledButton>
          {children}
      </StyledButton>
    </li>
  ) 
}

Menus.Toggle = Toggle
Menus.Menu = Menu
Menus.List = List
Menus.Button = Button

export default Menus
