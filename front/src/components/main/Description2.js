import { MainText } from "../../style/Style";
import styled from "styled-components";

/** Second page component
 *
 * @returns {component} Second page
 */
export default function Page2() {
  return (
    <Page>
      <MainText>
        <p>
          하루에 한 번 <span style={{ color: "#ad1a10" }}>영상을 보면</span>{" "}
          솜을 드립니다!
        </p>
        <p>
          솜을 곰에게 주면 <span style={{ color: "#ad1a10" }}>레벨업!</span>
        </p>
        <p>곰과 함께 키워가는 나의 지식</p>
      </MainText>
      <img src="/main2.png" alt="bear" width="40%" />
    </Page>
  );
}

//page style
const Page = styled.div`
  width: 98vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
