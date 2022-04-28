import { ProfileImg, ProfileText, UserInfo } from "./styles/Style";

function UserProfile({ user }) {
  return (
    <div>
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
      </UserInfo>
    </div>
  );
}

export default UserProfile;
