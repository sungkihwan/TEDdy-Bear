import { useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import {
  CommunityPage,
  UserCard,
  Link,
  RankCard,
  RankImg,
  UserPageText,
  Top5Text,
} from "../profile/styles/Style";

/** community page component
 *
 * @returns {component} community page
 */
function Community() {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [userList, setUserList] = useState([]);
  const [Rank, setRank] = useState([]);
  const navigate = useNavigate();

  const topicDict = {
    technology: "기술",
    science: "과학",
    culture: "문화",
    globalissues: "글로벌이슈",
    society: "사회",
    design: "디자인",
    socialchange: "사회변화",
    business: "비즈니스",
    animation: "애니메이션",
    health: "건강",
  };

  const fetchUserList = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("userlist");
      const ranking = getRanking(res.data);
      setUserList(res.data);
      setRank(ranking);
    } catch {
      console.log("유저리스트를 받을 수 없습니다.");
    }
    // fetchUserList 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  const getRanking = (list) => {
    const rank = [];
    list.map((user) => rank.push({ name: user.name, height: user.height }));
    const sortedRank = rank.sort((a, b) => a.height - b.height);
    return sortedRank.slice(-5);
  };

  // useEffect함수를 통해 fetchUserList 함수를 실행함.
  useEffect(() => {
    fetchUserList();
  }, []);

  if (!isFetchCompleted) {
    return <Loading />;
  }

  return (
    <CommunityPage>
      <RankCard>
        <Top5Text style={{ width: "100%" }}>오늘의 TOP5👑</Top5Text>
        {Rank.map((lank, index) => (
          <div key={index}>
            <UserPageText>{lank.name}님</UserPageText>
            <UserPageText>{lank.height} cm</UserPageText>
            <RankImg
              src="/mybear.png"
              alt="bear"
              style={{
                width: `${(index + 1) * 50}px`,
                height: `${(index + 1) * 50}px`,
              }}
            />
          </div>
        ))}
      </RankCard>
      {userList.map((user, index) => (
        <Link onClick={() => navigate(`/users/${user.id}`)}>
          <UserCard key={index}>
            <p>{user.name}님</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <p>
              {user.bearName}의 키 : {user.height}cm
            </p>
            {user.myTopics.map((topic, index) => (
              <span key={index}>{topicDict[topic]} </span>
            ))}
          </UserCard>
        </Link>
      ))}
    </CommunityPage>
  );
}

export default Community;
