import Styled from "styled-components";
import { brown } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

//text style54
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

//edit page style
export const EditPage = Styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  margin-top: 15vh;
`;

//each edit form style
export const EachEdit = Styled.div`
  width: 50%;
  display: flex;
  position: relative;
  align-items: center;
`;

//edit p tag style
export const EditText = Styled.p`
  color: ${brown[900]};
  font-size: 20px;
  width: 40%;
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
  width: 10em;
  height: 10em;
  display: block;
  margin: 0 auto;
`;

export const BearImg = Styled.img`
  width: 20em;
  height: 20em;
`;

//Lawn
export const LawnStyledPage = styled(Box)(() => ({
  minWidth: 270,
  minHeight: 100,
  margin: 10,
  borderRadius: 30,
  backgroundColor: brown[100],
  padding: 20,
}));

export const LawnText = Styled.p`
  color: ${brown[900]};
  font-size: 20px;
  width: 25%;
  text-align: center;
`;

//DateButton style
export const StyledDateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  maxWidth: "3rem",
  maxHeight: "3rem",
  minWidth: "3rem",
  minHeight: "3rem",
  margin: "2px",
  borderRadius: "15px",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

//BearFootIcon style
export const BearFootIcon = Styled.img`
  width: 2em;
  height: 2em;
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
  width: 90vw;
  margin: 10vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
`;

//community user list style
export const UserList = Styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  
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
  height: 250px;
`;
