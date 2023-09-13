import { HiCheckCircle, HiOutlineCheckBadge } from "react-icons/hi2"
import Heading from "../../ui/Heading"
import {useParams } from "react-router-dom"
import { styled } from "styled-components"
import Button from "../../ui/Button"
import {useNavigate} from "react-router-dom"
import ButtonGroup from "../../ui/ButtonGroup"


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
    const navigate = useNavigate()
    if(action === "signup")
        return (
            <Box>
                <HiOutlineCheckBadge style={{color: "#50C878", fontSize: "120px" }} />
                <Heading as="h5"> Thank you for signing up! Before you can start using our services, we need to verify your email address. We've sent a verification link to the email you provided during sign-up. Please check your inbox and click on the link to complete the verification process. If you don't see the email in your inbox, please check your spam or junk folder. </Heading>
            </Box>
    )
    return <>
        <Box>
            <HiCheckCircle style={{color: "#50C878", fontSize: "65px" }}/>
            <Heading as="h3"> Booking #{bookingId} has successfully {action} </Heading>
        </Box>
        <ButtonGroup>
            <Button variation="secondary"  onClick={() => navigate("/")}>
                Back to dashboard
            </Button>
        </ButtonGroup>
    </>

}

export default OnSuccess
