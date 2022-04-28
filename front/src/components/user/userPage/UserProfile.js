import { MyButton } from "../../common/MyButton";
import { ProfileCard, ProfileImg, ProfileText, UserInfo } from "./styles/Style";

function UserProfile({ user }) {
  return (
    <ProfileCard>
      <ProfileImg src="/mybear.png" alt="bear" />
      <UserInfo>
        <ProfileText>{user.name}</ProfileText>
        <ProfileText>{user.email}</ProfileText>
        <ProfileText style={{ fontSize: 15 }}>{user.description}</ProfileText>
        <ProfileText>
          {user.myTopics &&
            user.myTopics.map((topic, index) => (
              <span key={index}>{topic} </span>
            ))}
        </ProfileText>
        {user.age && <ProfileText>{user.age} 세</ProfileText>}
        <ProfileText>{user.occupation}</ProfileText>
        <ProfileText>{user.sex}</ProfileText>
        <MyButton style={{ width: "100%" }}>내 정보 편집</MyButton>
      </UserInfo>
    </ProfileCard>
  );
}

export default UserProfile;
