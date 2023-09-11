import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"
import { useEffect } from "react"
const iconStyle = {
    height: "3rem", 
    width: "6rem", 
    marginTop: "1rem"
}
function DarkModeToggle() {
    const {isDarkMode, toggleDarkmode} = useDarkMode()

    useEffect(() => {
        if(isDarkMode){
            document.documentElement.classList.add("dark-mode")
            document.documentElement.classList.remove("light-mode")
        }
        if(!isDarkMode){
            document.documentElement.classList.add("light-mode")
            document.documentElement.classList.remove("dark-mode")
        }
    }, [isDarkMode])


    function handleToggle (){
        toggleDarkmode()
    }
    return (
        <ButtonIcon onClick={handleToggle}>
            {isDarkMode ? <HiOutlineMoon style={iconStyle} /> : <HiOutlineSun style={iconStyle} />}
        </ButtonIcon>
    )
}

export default DarkModeToggle
