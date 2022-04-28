import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

function DateButton({ today, days, day, weekNum, dailyList, setDailyList }) {
  //버튼의 date를 계산하는 함수를 넣을 부분. 함수값에 따라 visiblity 속성을 바꿔줍니다.
  const date = today;

  function getDate(day) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
  }

  function clickHandler() {
    //   Api.get(`/viewhistorylists/${user.id}/${date}`).then((res) => setDailyList(res.data));
    // 이제 여기에 받아온 dailyList의 정보를 이용하여 잔디 아래에 정보를 띄워줍니다.
    // 잔디 MVP에서 dailyList가 있다면 정보를 띄워줍니다.
  }
  return (
    <div>
      <button style={{ height: "1.5rem" }}>
        {weekNum}:{day}
      </button>
    </div>
  );
}

export default DateButton;
