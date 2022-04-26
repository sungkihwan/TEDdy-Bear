import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useNaviagate } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import Account from "./Account";
import TeddyImage from "./TeddyImage";
import UserTopics from "./UserTopics";
import Name from "./Name";
import Buttons from "./Buttons";

import CalendarPicker from "@mui/lab/CalendarPicker";
import MonthPicker from "@mui/x-date-pickers/MonthPicker";
import YearPicker from "@mui/x-date-pickers/YearPicker";

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
  const minDate = new Date("2021-01-01T00:00:00.000");
  const maxDate = new Date("2099-01-01T00:00:00.000");
  const [date, setDate] = React.useState(new Date());
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      // const res = await Api.post("user/login", {
      //   email,
      //   password,
      // });
      // console.log("로그인에 성공했씁니다.\n");
      // 기본 페이지로 이동함.
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <CalendarPicker date={date} onChange={handleChange} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Card>
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
