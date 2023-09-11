import { createContext, useContext} from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const darkModeContext = createContext()

function DarkModeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, "isDarkMode")

    function toggleDarkmode(){
        setIsDarkMode(darkmode => !darkmode)
    }
    return <darkModeContext.Provider value={{isDarkMode,toggleDarkmode}}>
        {children}
    </darkModeContext.Provider>
}

export function useDarkMode(){
    const context = useContext(darkModeContext)
    if(!context) throw new Error("darkmode context is used outside of it's provider")
    return context
}

export default DarkModeProvider
