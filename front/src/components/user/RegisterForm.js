import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { useNavigate } from "react-router-dom";
// import { Container, Col, Row, Form, Button } from "react-bootstrap";

// import * as Api from "../../api";
// import { DispatchContext } from "../../App";

function RegisterForm() {
  //   const navigate = useNavigate();
  //   const dispatch = useContext(DispatchContext);

  //   //useState로 email 상태를 생성함.
  //   const [email, setEmail] = useState("");
  //   //useState로 password 상태를 생성함.
  //   const [password, setPassword] = useState("");

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
  //   //
  //   // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  //   const isFormValid = isEmailValid && isPasswordValid;

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

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            I can't use Icons
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );

  //   return (
  //     <Container>
  //       <Row className="justify-content-md-center mt-5">
  //         <Col lg={8}>
  //           <Form onSubmit={handleSubmit}>
  //             <Form.Group controlId="loginEmail">
  //               <Form.Label>이메일 주소</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 autoComplete="on"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //               />
  //               {!isEmailValid && (
  //                 <Form.Text className="text-success">
  //                   이메일 형식이 올바르지 않습니다.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group controlId="loginPassword" className="mt-3">
  //               <Form.Label>비밀번호</Form.Label>
  //               <Form.Control
  //                 type="password"
  //                 autoComplete="on"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //               {!isPasswordValid && (
  //                 <Form.Text className="text-success">
  //                   비밀번호는 4글자 이상입니다.
  //                 </Form.Text>
  //               )}
  //             </Form.Group>

  //             <Form.Group as={Row} className="mt-3 text-center">
  //               <Col sm={{ span: 20 }}>
  //                 <Button variant="primary" type="submit" disabled={!isFormValid}>
  //                   로그인
  //                 </Button>
  //               </Col>
  //             </Form.Group>

  //             <Form.Group as={Row} className="mt-3 text-center">
  //               <Col sm={{ span: 20 }}>
  //                 <Button variant="light" onClick={() => navigate("/register")}>
  //                   회원가입하기
  //                 </Button>
  //               </Col>
  //             </Form.Group>
  //           </Form>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
}

export default RegisterForm;

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

// export default RegisterForm;
