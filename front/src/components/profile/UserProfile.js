import { useNavigate } from "react-router-dom";
import { MyButton } from "../common/MyButton";
import { ProfileCard, ProfileImg, ProfileText, UserInfo } from "./styles/Style";

function UserProfile({ user, isEditable }) {
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
  return (
    <ProfileCard>
      <ProfileImg src="/mybear.png" alt="bear" />
      <UserInfo>
        <ProfileText>{user.name}</ProfileText>
        <ProfileText>{user.email}</ProfileText>
        <ProfileText>{user.description}</ProfileText>
        <ProfileText>
          {user.myTopics &&
            user.myTopics.map((topic, index) => (
              <span key={index}>{topicDict[topic]} </span>
            ))}
        </ProfileText>
        {user.age && <ProfileText>{user.age} 세</ProfileText>}
        <ProfileText>{user.occupation}</ProfileText>
        <ProfileText>{user.sex}</ProfileText>
        {isEditable && (
          <MyButton
            style={{ width: "100%" }}
            onClick={() => navigate("/users/edit")}
          >
            내 정보 편집
          </MyButton>
        )}
      </UserInfo>
    </ProfileCard>
  );
}

export default UserProfile;
