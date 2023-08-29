import { css, styled } from "styled-components";

// css function
const test = css`
    text-align: center;
`

const Heading = styled.h1`
${props => props.as === "h1" && css`
    font-size: 3rem;
    font-weight: 600;
`}
${props => props.as === "h2" && css`
    font-size: 2rem;
    font-weight: 600;
`}
${props => props.as === "h3" && css`
    font-size: 2rem;
    font-weight: 400;
`}


`


export default Heading