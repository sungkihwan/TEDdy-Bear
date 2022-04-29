import Styled from "styled-components";
import { brown } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

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

//top5 text style
export const Top5Text = Styled.p`
  color:${brown[900]};
  text-align: center;
  font-size: 30px;  
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
  position: relative;
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

//community page style
export const CommunityPage = Styled.div`
  width: 97vw;
  margin: 10vh auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`;

//community user card style
export const UserCard = styled(Box)(() => ({
  minWidth: 270,
  minHeight: 270,
  margin: 10,
  borderRadius: 30,
  color: brown[50],
  backgroundColor: brown[500],
  padding: 20,
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

//profile user card style
export const ProfileCard = styled(Box)(() => ({
  minWidth: 270,
  minHeight: 270,
  margin: 10,
  borderRadius: 30,
  backgroundColor: brown[100],
  padding: 20,
}));

//ranking card style
export const RankCard = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  minHeight: 300,
  margin: 10,
  padding: 30,
  borderRadius: 30,
  backgroundColor: brown[100],
  alignItems: "flex-end",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
}));

export const RankImg = Styled.img`
  display: block;
  margin: 0 auto;
`;

//Link style
export const Link = Styled.div`
  cursor: pointer;
`;
