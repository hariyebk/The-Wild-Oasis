import styled from "styled-components"
import useAuthorization from "../features/authentication/useAuthorization"
import Spinner from "./Spinner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StyledSpinner = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRoute({children}) {
    const {isgettinguser, isAuthenticated} = useAuthorization()
    const navigate  = useNavigate()

    useEffect(() => {
        if(!isgettinguser && !isAuthenticated ) navigate("/login", {replace: true})
    }, [isAuthenticated, isgettinguser, navigate])

    if(isgettinguser) 
        return <StyledSpinner>
                <Spinner/>
            </StyledSpinner>

    if(isAuthenticated) return children
}

export default ProtectedRoute
