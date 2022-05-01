import Bear from "./bear/Bear";
import Lawn from "./lawn/Lawn";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../App";
import { useParams } from "react-router-dom";
import * as Api from "../../api";
import Loading from "../common/Loading";
import UserProfile from "./UserProfile";
import { Page, UserLeftPage, UserRightPage, UserPageText } from "./styles/Style";

/** user page component
 *
 * @returns {component} user page
 */
function UserPage() {
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchUserOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    setUser(ownerData);
    setIsFetchCompleted(true);
    console.log(user);
  };

  useEffect(() => {
    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      setIsEditable(ownerId === userState.user.id);
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
    return <Loading />;
  }

  return (
    <Page>
      <UserLeftPage>
        <UserProfile isEditable={isEditable} user={user} />
      </UserLeftPage>
      <UserRightPage>
        <UserPageText style={{ fontSize: 20, margin: 0 }}>
          {user.name}님의 {user.bearName}
        </UserPageText>
        <Bear isEditable={isEditable} user={user} />
        <Lawn user={user} />
      </UserRightPage>
    </Page>
  );
}

export default UserPage;
