import { MainText } from "../../style/Style";
import { styled } from "@mui/material/styles";
import Styled from "styled-components";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

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
        <GoButton onClick={() => navigate("/media")}>영상 보러가기</GoButton>
      </div>
      <div>대충 동영상 페이지 이미지</div>
    </Page>
  );
}

//page style
const Page = Styled.div`
  width: 98vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

//button style
const GoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "8vw",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));
