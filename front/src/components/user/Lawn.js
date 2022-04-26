import styled from "styled-components";
import * as React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import Account from "./Account";
import TeddyImage from "./TeddyImage";
import UserTopics from "./UserTopics";
import Name from "./Name";
import Buttons from "./Buttons";

import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

/** Lawn component
 *
 * @returns {component} My lawn information
 */
function Lawn() {
  const [value, setValue] = React.useState(new Date());
  return (
    <Grid>
      <Page>잔디밭</Page>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Grid>
  );
}

//page style
const Page = styled.div`
  width: 98vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default Lawn;
