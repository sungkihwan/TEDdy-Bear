import { MainText } from "../../style/Style";
import styled from "styled-components";

/** First page component
 *
 * @returns {component} First page
 */
export default function Page1() {
  return (
    <Page>
      <img src="/book.gif" alt="book"></img>
      <MainText>
        <img src="/bear.png" alt="book" style={{ width: "10vw" }}></img>
        <p>TEDdy 곰이</p>
        <p>
          당신의 <span style={{ color: "#ad1a10" }}>교양지식 습관화</span>를
        </p>
        <p>도와줍니다</p>
      </MainText>
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
