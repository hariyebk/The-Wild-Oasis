import { HiCheckCircle } from "react-icons/hi2"
import Heading from "../../ui/Heading"
import {useParams } from "react-router-dom"
import { styled } from "styled-components"


const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 10rem 3rem;
    
`
function OnSuccess({action}) {
    const {id: bookingId} = useParams()
    return <>
        <Box>
            <HiCheckCircle style={{color: "#50C878", fontSize: "65px" }}/>
            <Heading as="h3"> Booking #{bookingId} has successfully {action} </Heading>
        </Box>
    </>
}

export default OnSuccess
