import { useEffect, useState } from "react";
import { BearImg, BearInfo, BearPage, MyPageText } from "../styles/Style";
import ExpBar from "./ExpBar";
import * as Api from "../../../api";
import { MyButton } from "../../common/MyButton";

function MyBear({ user }) {
  const [bear, setBear] = useState({});
  console.log(user);
  useEffect(() => {
    setBear({
      cotton: user.cotton,
      height: user.height,
      level: user.level,
      exp: user.exp,
    });
  }, []);
  let maxExp = bear.level * 10;
  const [progress, setProgress] = useState(bear.exp / maxExp);

  //server bear data update
  const fetchBear = async () => {
    await Api.put(`users/${user.id}`, {
      cotton: bear.cotton,
      level: 1,
      height: bear.height,
      exp: bear.exp,
    });
  };
  //if exp full, execute a function
  useEffect(() => {
    if (bear.exp === maxExp) {
      setBear((cur) => ({ ...cur, exp: 0 }));
      setProgress(0);
      setBear((cur) => ({ ...cur, level: cur.level + 1 }));
      setBear((cur) => ({ ...cur, height: cur.height + 10 }));
      maxExp = bear.level * 10;
    }
    setProgress((bear.exp / maxExp) * 100);
    fetchBear();
  }, [bear.exp, bear.cotton]);

  //click button, execute a function
  const giveCotton = () => {
    if (bear.cotton === 0) {
      alert("솜이 부족합니다!");
      setBear((cur) => ({ ...cur, cotton: 0 }));
    } else {
      setBear((cur) => ({ ...cur, exp: cur.exp + 1 }));
      setBear((cur) => ({ ...cur, cotton: cur.cotton - 1 }));
    }
    fetchBear();
    return;
  };
  return (
    <BearPage>
      <BearImg src="/mybear.png" alt="bear" />
      <BearInfo>
        <MyPageText>LEVEL {bear.level}</MyPageText>
        <MyPageText>
          {bear.exp} / {maxExp}
        </MyPageText>
        <ExpBar value={progress} />
        <MyPageText>키 {bear.height} cm</MyPageText>
        <MyPageText>남은 솜 {bear.cotton}</MyPageText>
        <MyButton onClick={giveCotton}>솜 주기</MyButton>
      </BearInfo>
    </BearPage>
  );
}

export default MyBear;
