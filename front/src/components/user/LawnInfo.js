//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LawnCard from "./LawnCard";

function LawnInfo({ dailyList, selectedDate }) {
  const isEmpty = dailyList.length > 0;
  return (
    <Grid container justifyContent="center">
      {isEmpty ? (
        <Grid item>
          <Typography component="h1" variant="h5">
            No history were found.
          </Typography>
        </Grid>
      ) : (
        <Grid item>
          <Typography component="h1" variant="h5">
            {selectedDate}의 발자취
          </Typography>
          {dailyList.map((talk, idx) => (
            <Grid item key={idx}>
              <LawnCard talk={talk} idx={idx} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

export default LawnInfo;
