import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { MyButton } from "../common/MyButton";
import { ProfileCard, ProfileText, UserInfo } from "./styles/Style";

/** user profile component
 *
 * @param {object} user user data
 * @param {boolean} isEditable enable edit
 * @returns
 */
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
      <Grid container justifyContent="center">
        <Avatar src={user.profileUrl} sx={{ width: 150, height: 150 }} />
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
          {user.age && <ProfileText>{user.age}</ProfileText>}
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
      </Grid>
    </ProfileCard>
  );
}

export default UserProfile;
