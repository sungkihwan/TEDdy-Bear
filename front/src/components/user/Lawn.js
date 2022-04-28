import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useNaviagate, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as Api from "../../api";

import DateForm from "./DateButton";
import WeekForm from "./WeekForm";
import LawnsInfo from "./LawnsInfo";

/** Lawn component
 *
 * @returns {component} My lawn information
 */
function Lawn({ user }) {
  const [history, setHistory] = useState([]);
  // useEffect(() => {
  //   Api.get(`/viewhistorylists/${user.id}`).then((res) => setHistory(res.data));
  // }, []);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const [dailyList, setDailyList] = useState([]);

  var arr = [];
  for (let i = 0; i > -53; i--) {
    arr.push(i);
  }

  const today = new Date();

  const clickHandler = async (e) => {
    e.preventDefault();

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("/viewhistory/create", {
        user_id: user.id,
        talkId: getRandomInt(0, 1000),
      });
    } catch (err) {
      console.log("데이터 만들기에 실패했습니다..\n", err);
    }
  };
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <Button variant="outlined" onClick={clickHandler}>
          목업 데이터 만들기
        </Button>
      </Grid>
      <Grid container item direction="row" justifyContent="center" alignItems="center">
        {arr.map((num) => (
          <Grid item>
            <WeekForm key={num} weekNum={num} dailyList={dailyList} setDailyList={setDailyList} />
          </Grid>
        ))}
      </Grid>
      {!dailyList && <LawnsInfo />}
    </Grid>
  );
}

//page style
const Page = styled.div`
  width: 98vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default Lawn;
