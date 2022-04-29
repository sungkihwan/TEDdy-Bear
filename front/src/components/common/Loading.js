import styled from "styled-components";

/** loading component
 *
 * @returns {component} loading image
 */
function Loading() {
  return <Img src="/loading.gif" alt="loading" />;
}

//image style
const Img = styled.img`
  height: 40vh;
  width: 25vw;
  display: block;
  margin: 30vh auto;
`;

export default Loading;
