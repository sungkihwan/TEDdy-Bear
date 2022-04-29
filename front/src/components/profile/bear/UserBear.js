import { BearInfo, BearPage, UserPageText } from "../styles/Style";

function UserBear({ user }) {
  return (
    <BearPage>
      <img src="/mybear.png" alt="bear" />
      <BearInfo>
        <UserPageText>LEVEL {user.level}</UserPageText>
        <UserPageText>키 {user.height} cm</UserPageText>
      </BearInfo>
    </BearPage>
  );
}

export default UserBear;
