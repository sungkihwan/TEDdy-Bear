import Header from "../Header";
import styled from "styled-components";
import Bear from "./Bear";
import Lawn from "./Lawn";

/** My page component
 *
 * @returns {component} My page
 */
export default function MyPage() {
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

//page style
const Page = styled.div`
  width: 98vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
