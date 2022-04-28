import Styled from "styled-components";
import { brown } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

//text style
export const MyPageText = Styled.p`
  color: ${brown[900]};
`;

//profile text style
export const ProfileText = Styled.p`
  color: ${brown[900]};
  font-size: 20px;
`;

//user page text style
export const UserPageText = Styled.p`
  color:${brown[900]};
  text-align: center;
`;

//user page style
export const Page = Styled.div`
  width: 98vw;
  display: flex;
  position: relative;
  margin-top: 15vh;
`;

//user left page style
export const UserLeftPage = Styled.div`
  width: 30%;
  margin-left: 3vh;
  background-color: ${brown[100]};
  position: relative;
  height: 80vh;
  border: 1px solid ${brown[700]};
  border-radius: 20px;
`;

//user right page style
export const UserRightPage = Styled.div`
  display: flex;
  width: 70%;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

//bear page style
export const BearPage = Styled.div`
  width: 100%;
  display: flex;
  margin-left: 10;
  justify-content: center;
`;

//bear information style
export const BearInfo = Styled.div`
  width: 35%;
  margin: auto 0
`;

export const UserInfo = Styled.div`
  margin-left: 1vw;
`;

//profile image style
export const ProfileImg = Styled.img`
  width: 100;
  height: 100;
  border-radius: 10;
  display: block;
  margin: 0 auto;
`;

//bar style
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: brown[100],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: brown[500],
  },
}));
