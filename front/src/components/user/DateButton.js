import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

function DateButton({ days, day }) {
  function getDate(day) {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    var dayOfWeek = week[new Date(day).getDay()];
    return dayOfWeek;
  }

  return (
    <div>
      <button style={{ height: "1rem" }} />
    </div>
  );
}

export default DateButton;
