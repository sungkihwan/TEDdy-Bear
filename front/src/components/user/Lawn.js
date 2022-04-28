import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useNaviagate, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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
  for (let i = 1; i < 54; i++) {
    arr.push(i);
  }
  const today = new Date();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {arr.map((idx) => (
        <Grid item>
          <WeekForm weekNum={idx} dailyList={dailyList} setDailyList={setDailyList} />
        </Grid>
      ))}
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
