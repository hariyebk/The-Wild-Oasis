import { styled } from "styled-components";

const P = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
function Empty({ resourceName}) {
  return <>
      <P> No {resourceName} could be found.</P>
  </>

}
export default Empty;
