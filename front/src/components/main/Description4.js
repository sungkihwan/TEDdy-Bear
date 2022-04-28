import { MainText } from "../../style/Style";
import { useNavigate } from "react-router-dom";
import { Page } from "./styles/Style";
import { MyButton } from "../common/MyButton";

/** Fourth page component
 *
 * @returns {component} Fourth page
 */
export default function Page4() {
  const navigate = useNavigate();
  return (
    <Page>
      <div>
        <MainText>
          <p>관심사를 선택하면</p>
          <p>
            그에 맞는 <span style={{ color: "#ad1a10" }}>TED 영상을 추천</span>
            해줍니다!
          </p>
          <p>TEDdy Bear가 추천하는 영상도</p>
          <p>확인해보세요!</p>
        </MainText>
        <MyButton onClick={() => navigate("/media")}>영상 보러가기</MyButton>
      </div>
      <div>대충 동영상 페이지 이미지</div>
    </Page>
  );
}
