import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DateButton from "./DateButton";

function WeekForm({ days, day }) {
  function getDate(day) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
  }

  let week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      {week.map(() => (
        <DateButton />
      ))}
    </div>
  );
}

export default WeekForm;
