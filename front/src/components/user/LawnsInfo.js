//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function LawnsInfo({ historyList, date }) {
  return (
    <Grid container>
      <Grid item>
        <Typography component="h1" variant="h5">
          {date}의 발자취
        </Typography>
      </Grid>
      {historyList.map((history) => {
        return <Grid item>{history}</Grid>;
      })}
    </Grid>
  );
}

export default LawnsInfo;
