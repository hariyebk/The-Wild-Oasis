import styled from "styled-components"
import useAuthorization from "../features/authentication/useAuthorization"
import Spinner from "./Spinner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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
    const queryClient = useQueryClient()

    useEffect(() => {
        if(!isgettinguser && !isAuthenticated ){
            queryClient.removeQueries("user")
            navigate("/login", {replace: true})
        }
    }, [isAuthenticated, isgettinguser, navigate, queryClient])

    if(isgettinguser) 
        return <StyledSpinner>
                <Spinner/>
            </StyledSpinner>

    if(isAuthenticated) return children
}

export default ProtectedRoute
