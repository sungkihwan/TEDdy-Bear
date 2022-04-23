import styled from "styled-components";

export default function Lawn() {
  return <Page>잔디밭</Page>;
}

const Page = styled.div`
  width: 98vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
