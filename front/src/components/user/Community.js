import { useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import { CommunityPage, UserCard, Link } from "./userPage/styles/Style";

function Community() {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [userList, setUserList] = useState([]);
  const [Lank, setLank] = useState([]);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("userlist");
      setUserList(res.data);
    } catch {
      console.log("유저리스트를 받을 수 없습니다.");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
  };

  const lanking = (list) => {
    list.map((user) => Lank.push({ name: user.name, height: user.height }));
    const sortedLank = Lank.sort((a, b) => b.height - a.height);
    setLank(sortedLank);
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    console.log(userList);
    lanking(userList);
  }, []);

  if (!isFetchCompleted) {
    return <Loading />;
  }

  return (
    <CommunityPage>
      {/* {Lank.map((lank, index) => (
        <div key={index}>
          <p>{lank.name}</p>
          <p>{lank.height}</p>
        </div>
      ))} */}
      {userList.map((user, index) => (
        <UserCard key={index}>
          <Link onClick={() => navigate(`/users/${user.id}`)}>
            {user.name}님
          </Link>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <p>
            {user.bearName}의 키 : {user.height}cm
          </p>
        </UserCard>
      ))}
    </CommunityPage>
  );
}

export default Community;
