import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DateButton from "./DateButton";

function WeekForm({ today, days, day, weekNum, dailyList, setDailyList }) {
  let week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      {week.map((day, idx) => (
        <DateButton day={idx} weekNum={weekNum} today={today} dailyList={dailyList} setDailyList={setDailyList} />
      ))}
    </div>
  );
}

export default WeekForm;
