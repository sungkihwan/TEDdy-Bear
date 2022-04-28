//import styled from "styled-components";
import * as React from "react";
import DateButton from "./DateButton";

function WeekForm({ today, days, day, weekNum, dailyList, setDailyList }) {
  let week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      {week.map((day, idx) => (
        <DateButton key={idx} day={idx} weekNum={weekNum} today={today} dailyList={dailyList} setDailyList={setDailyList} />
      ))}
    </div>
  );
}

export default WeekForm;
