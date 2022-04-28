import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import * as Api from "../../api";

function DateButton({ today, days, day, weekNum, dailyList, setDailyList, user, setSelectedDate }) {
  //버튼의 date를 계산하는 함수를 넣을 부분. 함수값에 따라 visiblity 속성을 바꿔줍니다.
  let date = new Date();
  date.setDate(date.getDate() - 7 * weekNum - day + 1);

  function getDate(day) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
  }

  function makeDateToString(date) {
    const stringDate = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    return stringDate;
  }

  const stringifiedDate = makeDateToString(date);

  function clickHandler() {
    // 여기에 받아온 dailyList의 정보를 이용하여 잔디 아래에 정보를 띄워줍니다.
    // 잔디 MVP에서 dailyList가 있다면 정보를 띄워줍니다.
    console.log(weekNum, day, date, stringifiedDate);
    setSelectedDate(stringifiedDate);
    try {
      Api.get(`/viewhistorylists/${user.id}/${stringifiedDate}`).then((res) => setDailyList(res.data));
    } catch (err) {
      setDailyList(["Error"]);
      console.log(dailyList);
    }
  }

  return (
    <div>
      <button style={{ height: "1.5rem" }} onClick={clickHandler}>
        {weekNum}:{day}
      </button>
    </div>
  );
}

export default DateButton;
