import Header from "../Header";
import styled from "styled-components";
import Bear from "./Bear";
import Lawn from "./Lawn";
import * as Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../App";
import { useParams } from "react-router-dom";

/** My page component
 *
 * @returns {component} My page
 */
export default function MyPage() {
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchUserOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    console.log(ownerData);
    setIsFetchCompleted(true);
  };
  useEffect(() => {
    console.log(userState);
    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchUserOwner 함수를 실행함.
      fetchUserOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchUserOwner 함수를 실행함.
      fetchUserOwner(ownerId);
    }
  }, [params, userState]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <>
      <Page>
        <Header />
        <Bear />
      </Page>
      <Lawn />
    </>
  );
}

//page style
const Page = styled.div`
  width: 98vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
