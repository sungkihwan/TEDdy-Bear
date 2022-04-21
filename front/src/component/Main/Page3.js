import { MainText } from "../common/Style";
import styled from "styled-components";

function Page3() {
  return (
    <Page>
      <div>대충 잔디밭 이미지</div>
      <MainText>
        <p>나는 얼마나 부지런할까?</p>
        <p>
          <span style={{ color: "#ad1a10" }}>잔디밭 관리</span>로 확인해봐요
        </p>
      </MainText>
    </Page>
  );
}

export default Page3;

const Page = styled.div`
  width: 98vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
