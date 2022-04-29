import styled from "styled-components";

export default function Loading() {
  return <Img src="/loading.gif" alt="loading" />;
}

//image style
const Img = styled.img`
  height: 40vh;
  width: 25vw;
  display: block;
  margin: 30vh auto;
`;
