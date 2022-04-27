import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useNaviagate, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import DateForm from "./DateButton";
import WeekForm from "./WeekForm";

/** Lawn component
 *
 * @returns {component} My lawn information
 */
function Lawn({ user }) {
  const [history, setHistory] = useState(["데이터가 없습니다", "실험", "진짜없나"]);
  // useEffect(() => {
  //   Api.get(`/viewhistorylists/${user.id}`).then((res) => setHistory(res.data));
  // }, []);

  function getDate(날짜문자열) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(날짜문자열).getDay()];
    return dayOfWeek;
  }
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  var arr = [];
  for (let i = 0; i < 53; i++) {
    arr.push(i);
  }
  const today = new Date();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {arr.map(() => (
        <Grid item>
          <WeekForm />
        </Grid>
      ))}
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
