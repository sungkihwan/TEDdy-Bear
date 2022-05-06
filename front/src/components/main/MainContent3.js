import { MainText, Page } from "./styles/Style";

/** Third page component
 *
 * @returns {component} Third page
 */
function Description3() {
  return (
    <Page>
      <img src="/Lawn.PNG" alt="lawn" />
      <MainText>
        <p>나는 얼마나 부지런할까?</p>
        <p>
          <span style={{ color: "#ad1a10" }}>달력에 도장</span>을 찍어봐요!
        </p>
      </MainText>
    </Page>
  );
}
export default Description3;
