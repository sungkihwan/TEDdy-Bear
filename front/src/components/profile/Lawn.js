import styled from "styled-components";

/** Lawn component
 *
 * @returns {component} My lawn information
 */
export default function Lawn() {
  return <Page>잔디밭</Page>;
}

//page style
const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
