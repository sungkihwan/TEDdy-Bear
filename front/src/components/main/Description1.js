import { MainText, Page } from "./styles/Style";

/** First page component
 *
 * @returns {component} First page
 */
function Description1() {
  return (
    <Page>
      <img src="/book.gif" alt="book" style={{ width: "35%" }} />
      <MainText>
        <img
          src="/bear.png"
          alt="bear"
          style={{ width: "10vw", height: "10vh" }}
        />
        <p>TEDdy 곰이</p>
        <p>
          당신의 <span style={{ color: "#ad1a10" }}>교양지식 습관화</span>를
        </p>
        <p>도와줍니다</p>
      </MainText>
    </Page>
  );
}
export default Description1;
