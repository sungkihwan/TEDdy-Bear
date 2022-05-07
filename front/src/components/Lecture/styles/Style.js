import styled from "styled-components";
import { theme } from "../../../style/Style";

//Lecture explanation title text style
export const TitleText = styled.div`
  font-size: 30px;
  color: ${theme.brown.main};
  margin: 10px;
`;

//Lecture explanation description text style
export const DescriptionText = styled.div`
  font-size: 20px;
  color: ${theme.brown.dark};
  margin: 10px;
`;

//Lecture explanation review user name style
export const UserNameText = styled.div`
  font-size: 23px;
  color: ${theme.brown.main};
  margin: 10px;
`;

export const UserCommentText = styled.div`
  font-size: 20px;
  color: ${theme.brown.dark};
  margin: 10px;
`;
