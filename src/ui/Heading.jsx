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
${props => props.as === "h4" && css`
    font-size: 2.5rem;
    font-weight: 650;
    text-align: center;
`}
`


export default Heading