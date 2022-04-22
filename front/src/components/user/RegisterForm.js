import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

// import * as Api from "../../api";
// import { DispatchContext } from "../../App";

function RegisterForm() {
  //   const navigate = useNavigate();
  //   const dispatch = useContext(DispatchContext);

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
  const theme = createTheme();

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
  const [tempPage, setTempPage] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: email,
      password: password,
    });
  };

  const PrevButton = () => {
    if (tempPage !== 1) {
      return (
        <Grid item>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setTempPage(tempPage - 1);
            }}
          >
            이전
          </Button>
        </Grid>
      );
    }
  };

  const NextButton = () => {
    if (tempPage < 3) {
      return (
        <Grid item>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid}
            onClick={() => {
              setTempPage(tempPage + 1);
            }}
          >
            다음
          </Button>
        </Grid>
      );
    } else if (tempPage <= 3) {
      return (
        <Grid item>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid}
          >
            회원가입
          </Button>
        </Grid>
      );
    }
  };

  const pageChecker = () => {
    if (tempPage === 1) {
      return "flex-end";
    } else {
      return "space-between";
    }
  };

  const InputForm = () => {
    switch (tempPage) {
      case 1:
        return (
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center" }}
            justifyContent="center"
          >
            <Grid item sx={{ mb: 2 }}>
              <Typography component="h1" variant="h5">
                테디 곰의 가족이 되어주세요!
              </Typography>
            </Grid>
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
                <Typography variant="caption" display="block" gutterBottom>
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
        );
      case 2:
        const topTopics = [];
        return (
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center" }}
            justifyContent="center"
          >
            <Grid item sx={{ mb: 2 }}>
              <Typography component="h1" variant="h5">
                좋아하는 주제가 있나요?
              </Typography>
            </Grid>
            <Autocomplete
              multiple
              id="tags-filled"
              options={topTopics.map((option) => option.title)}
              freeSolo
              renderTags={(values, getTagProps) =>
                values.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="freeSolo"
                  placeholder="Favorites"
                />
              )}
            />
          </Grid>
        );
      case 3:
      default:
        return <div>에?러</div>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 4 }}>
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
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <InputForm />
                <Grid container spacing={4} justifyContent={pageChecker}>
                  <PrevButton />
                  <NextButton />
                </Grid>
                <Grid item>
                  <Chip label={`${tempPage} / 3`} color="primary" />
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/Login" variant="body2">
                      이미 계정이 있나요?
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
  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { Container, Col, Row, Form, Button } from "react-bootstrap";

  // import * as Api from "../../api";

  // function RegisterForm() {
  //   const navigate = useNavigate();

  //   //useState로 email 상태를 생성함.
  //   const [email, setEmail] = useState("");
  //   //useState로 password 상태를 생성함.
  //   const [password, setPassword] = useState("");
  //   //useState로 confirmPassword 상태를 생성함.
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   //useState로 name 상태를 생성함.
  //   const [name, setName] = useState("");

  //   //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  //   const validateEmail = (email) => {
  //     return email
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       );
  //   };

  //   //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  //   const isEmailValid = validateEmail(email);
  //   // 비밀번호가 4글자 이상인지 여부를 확인함.
  //   const isPasswordValid = password.length >= 4;
  //   // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  //   const isPasswordSame = password === confirmPassword;
  //   // 이름이 2글자 이상인지 여부를 확인함.
  //   const isNameValid = name.length >= 2;

  //   // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  //   const isFormValid =
  //     isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       // "user/register" 엔드포인트로 post요청함.
  //       await Api.post("user/register", {
  //         email,
  //         password,
  //         name,
  //       });

  //       // 로그인 페이지로 이동함.
  //       navigate("/login");
  //     } catch (err) {
  //       console.log("회원가입에 실패하였습니다.", err);
  //     }
  //   };

  //   return (
  //     <Container>
  //       <Row className="justify-content-md-center mt-5">
  //         <Col lg={8}>
  //           <Form onSubmit={handleSubmit}>
  //             <Form.Group controlId="registerEmail">
  //               <Form.Label>이메일 주소</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 autoComplete="off"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //               />
  //               {!isEmailValid && (
  //                 <Form.Text className="text-success">
  //                   이메일 형식이 올바르지 않습니다.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group controlId="registerPassword" className="mt-3">
  //               <Form.Label>비밀번호</Form.Label>
  //               <Form.Control
  //                 type="password"
  //                 autoComplete="off"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //               {!isPasswordValid && (
  //                 <Form.Text className="text-success">
  //                   비밀번호는 4글자 이상으로 설정해 주세요.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group controlId="registerConfirmPassword" className="mt-3">
  //               <Form.Label>비밀번호 재확인</Form.Label>
  //               <Form.Control
  //                 type="password"
  //                 autoComplete="off"
  //                 value={confirmPassword}
  //                 onChange={(e) => setConfirmPassword(e.target.value)}
  //               />
  //               {!isPasswordSame && (
  //                 <Form.Text className="text-success">
  //                   비밀번호가 일치하지 않습니다.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group controlId="registerName" className="mt-3">
  //               <Form.Label>이름</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 autoComplete="off"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //               {!isNameValid && (
  //                 <Form.Text className="text-success">
  //                   이름은 2글자 이상으로 설정해 주세요.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group as={Row} className="mt-3 text-center">
  //               <Col sm={{ span: 20 }}>
  //                 <Button variant="primary" type="submit" disabled={!isFormValid}>
  //                   회원가입
  //                 </Button>
  //               </Col>
  //             </Form.Group>

  //             <Form.Group as={Row} className="mt-3 text-center">
  //               <Col sm={{ span: 20 }}>
  //                 <Button variant="light" onClick={() => navigate("/login")}>
  //                   로그인하기
  //                 </Button>
  //               </Col>
  //             </Form.Group>
  //           </Form>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }
}
export default RegisterForm;
