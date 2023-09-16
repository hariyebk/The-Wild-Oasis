import styled from "styled-components";

const StyledRadio = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    &:checked{
        border: 1px solid var(--color-grey-300);
        background-color: var(--color-grey-0);
    }
`
const Label = styled.label`
    display: inline-block;
    cursor: pointer;
`
function RadioInput({id , value1, value2}) {
    return (
        <>
            <StyledRadio type="radio" id = {id} value={value1} defaultChecked />
            <Label for = {value1}> {value1} </Label>

            <StyledRadio type="radio" id = {id} value={value2} />
            <Label for = {value2}> {value2} </Label>
        </>
    )
}

export default RadioInput
