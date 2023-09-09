import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: ${props => props.align};
`;

ButtonGroup.defaultProps = {
  align: "flex-end"
}
export default ButtonGroup;
