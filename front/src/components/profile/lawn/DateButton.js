import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import * as Api from "../../../api";

function DateButton({
  day,
  weekNum,
  dailyList,
  setDailyList,
  user,
  setSelectedDate,
  watchedDays,
}) {
  //버튼의 date를 계산하는 함수를 넣을 부분. 함수값에 따라 visiblity 속성을 바꿔줍니다.
  let date = new Date();
  date.setDate(date.getDate() - 7 * weekNum - day);

  function getDate(day) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
  }

  function makeDateToString(date) {
    const stringDate = `${date.getFullYear()}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    return stringDate;
  }

  const stringifiedDate = makeDateToString(date);

  async function clickHandler() {
    // 여기에 받아온 dailyList의 정보를 이용하여 잔디 아래에 정보를 띄워줍니다.
    // 잔디 MVP에서 dailyList가 있다면 정보를 띄워줍니다.
    setSelectedDate(stringifiedDate);
    console.log(watchedDays);
    try {
      const res = await Api.get(
        `viewhistorydatelist/${user.id}/${stringifiedDate}`
      );
      setDailyList(res.data);
    } catch (err) {
      console.log("데이터 불러오기에 실패했습니다..\n", err);
      setDailyList(["Error"]);
      console.log(dailyList);
    }
  }

  const btnColor = watchedDays.has(stringifiedDate) ? "blue" : "white";

  return (
    <div>
      <button style={{ backgroundColor: btnColor }} onClick={clickHandler}>
        {("0" + (date.getMonth() + 1)).slice(-2)}/
        {("0" + date.getDate()).slice(-2)}
      </button>
    </div>
  );
}

export default DateButton;
