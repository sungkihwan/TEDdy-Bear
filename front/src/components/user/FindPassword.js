import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import * as Api from "../../api";
import TeddyImage from "./TeddyImage";
import TextField from "@mui/material/TextField";
import { MyButton } from "../common/MyButton";
import { useNavigate } from "react-router-dom";

function FindPassword() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const validateEmail = (email) => {
    if (email !== "") {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return false;
  };
  const isEmailValid = validateEmail(email);

  const handlePasswordIssue = () => {
    Api.post("user/mail", { email: email, type: "temp" }).then((res) =>
      console.log(res)
    );
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: 12 }}
      >
        <TeddyImage />
        <Card>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                임시 비밀번호를 받을 이메일 입력
              </Typography>
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailValid && (
                    <Typography variant="caption" display="block" gutterBottom>
                      이메일 형식이 올바르지 않습니다.
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <MyButton onClick={handlePasswordIssue}>
                임시 비밀번호 발급
              </MyButton>
              <h4>임시 비밀번호로 로그인 후 비밀번호를 변경해주세요</h4>
            </Box>
          </Container>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default FindPassword;
