//import styled from "styled-components";
import * as React from "react";
import DateButton from "./DateButton";
import Grid from "@mui/material/Grid";

function WeekForm({ today, days, day, weekNum, dailyList, setDailyList, setSelectedDate, watchedDays }) {
  let week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Grid container direction="column-reverse">
      {week.map((day, idx) => (
        <Grid item>
          <DateButton
            key={idx + weekNum * 7}
            day={idx}
            weekNum={weekNum}
            today={today}
            dailyList={dailyList}
            setDailyList={setDailyList}
            setSelectedDate={setSelectedDate}
            watchedDays={watchedDays}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default WeekForm;
