import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import * as Api from "../../api";
// import { DispatchContext } from "../../App";

function LoginForm() {
  //   const navigate = useNavigate();
  //   const dispatch = useContext(DispatchContext);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       // "user/login" 엔드포인트로 post요청함.
  //       const res = await Api.post("user/login", {
  //         email,
  //         password,
  //       });
  //       // 유저 정보는 response의 data임.
  //       const user = res.data;
  //       // JWT 토큰은 유저 정보의 token임.
  //       const jwtToken = user.token;
  //       // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
  //       sessionStorage.setItem("userToken", jwtToken);
  //       // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
  //       dispatch({
  //         type: "LOGIN_SUCCESS",
  //         payload: user,
  //       });

  //       // 기본 페이지로 이동함.
  //       navigate("/", { replace: true });
  //     } catch (err) {
  //       console.log("로그인에 실패하였습니다.\n", err);
  //     }
  //   };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 8 }}>
        <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>
          <Card sx={{ alignItems: "center" }}>
            <img
              src="https://image.shutterstock.com/image-photo/cute-teddy-bear-isolated-on-600w-2022108608.jpg"
              alt="Teddy Bear"
              loading="lazy"
            />
          </Card>
        </Box>
        <Card>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                오늘도 와주셨군요!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="이메일"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isEmailValid && (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        이메일 형식이 올바르지 않습니다.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="비밀번호"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isPasswordValid && (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        margin="normal"
                      >
                        비밀번호는 4글자 이상입니다.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isFormValid}
                >
                  로그인
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/Register" variant="body2">
                      테디곰과 함께 공부할래요?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginForm;
