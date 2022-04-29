//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LawnCard from "./LawnCard";

function LawnInfo({ dailyList, selectedDate }) {
  console.log(dailyList);
  return (
    <Grid item>
      <Typography component="h1" variant="h5">
        {selectedDate}의 발자취
      </Typography>
      {dailyList.length === 0 && (
        <Typography component="h1" variant="h5">
          No history were found.
        </Typography>
      )}
      {dailyList.map((talk, idx) => (
        <Grid item key={idx}>
          <LawnCard talk={talk} idx={idx} />
        </Grid>
      ))}
    </Grid>
  );
}

export default LawnInfo;
