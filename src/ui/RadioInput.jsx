import styled from "styled-components";

const StyledRadio = styled.input`
    display: inline-block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`

function RadioInput() {
    return (
        <StyledRadio />
    )
}

export default RadioInput
