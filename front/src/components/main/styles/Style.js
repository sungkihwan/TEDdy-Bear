import styled from "styled-components";
import { theme } from "../../../style/Style";

//each page style
export const Page = styled.div`
  width: 98vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

//main page style
export const MainPage = styled.div`
  position: relative;
  margin-top: 10vh;
`;

//Main page text style
export const MainText = styled.div`
  font-size: 30px;
  color: ${theme.brown.main};
`;
