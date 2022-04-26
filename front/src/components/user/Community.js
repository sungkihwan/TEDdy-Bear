import { useEffect, useState } from "react";
import * as Api from "../../api";
import { styled } from "@mui/material/styles";
import Styled from "styled-components";
import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Bear from "./Bear";

export default function Community() {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("userlist");
      setUserList(res.data);
      console.log(userList);
    } catch {
      console.log("유저리스트를 받을 수 없습니다.");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }
  return (
    <Page>
      {userList.map((user, index) => (
        <UserCard key={index}>
          <Link onClick={() => navigate(`/users/${user.id}`)}>
            {user.name}님
          </Link>
          <p>{user.email}</p>
        </UserCard>
      ))}
    </Page>
  );
}

//page style
const Page = Styled.div`
  width: 97vw;
  margin: 10vh auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`;

//UserCard style
const UserCard = styled(Box)(() => ({
  minWidth: 270,
  height: 270,
  margin: 10,
  borderRadius: 30,
  color: brown[50],
  backgroundColor: brown[500],
  padding: 20,
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

//Link style
const Link = Styled.div`
  cursor: pointer;
`;
