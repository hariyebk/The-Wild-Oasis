import {Outlet} from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { styled } from "styled-components"

const StyleAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`
const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 10px;
}

    &::-webkit-scrollbar-thumb {
    background-color: #888; /* Set the color of the scrollbar thumb */
    border-radius: 10px; /* Add rounded corners to the thumb */
}

`
const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`

function AppLayout() {
    return (
        <StyleAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container>
                    <Outlet  />
                </Container>
            </Main>
        </StyleAppLayout>
    )
}

export default AppLayout
