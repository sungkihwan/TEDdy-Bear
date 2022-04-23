import Header from "../Header";
import styled from "styled-components";
import Bear from "./Bear";
import Lawn from "./Lawn";

function MyPage() {
  return (
    <>
      <Page>
        <Header />
        <Bear />
      </Page>
      <Lawn />
    </>
  );
}

export default MyPage;

const Page = styled.div`
  width: 98vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
