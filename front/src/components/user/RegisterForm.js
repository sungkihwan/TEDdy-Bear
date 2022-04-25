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

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tName, setTName] = useState("테디");
  const [viewPage, setViewPage] = useState(1);
  const [userTopics, setUserTopics] = useState(["테디곰!"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
        bear_name: tName,
        myTopic: userTopics.slice(1),
      });
      console.log("회원가입에 성공했습니다.");
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  const theme = createTheme();

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
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;
  const isNameValid = name.length >= 0 && tName.length >= 0;

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 12 }} alignItems="stretch">
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {viewPage === 1 && (
                  <Grid container spacing={2} sx={{ alignItems: "center" }} justifyContent="center">
                    <Grid item sx={{ mb: 2 }}>
                      <Typography component="h1" variant="h5">
                        테디 곰의 가족이 되어주세요!
                      </Typography>
                    </Grid>
                    <Account
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      isEmailValid={isEmailValid}
                      isPasswordValid={isPasswordValid}
                    />
                  </Grid>
                )}
                {viewPage === 2 && <UserTopics userTopics={userTopics} setUserTopics={setUserTopics} />}
                {viewPage === 3 && <Name name={name} setName={setName} tName={tName} setTName={setTName} />}
                <Grid container item alignItems="flex-end">
                  <Buttons viewPage={viewPage} setViewPage={setViewPage} isNameValid={isNameValid} isFormValid={isFormValid} handleSubmit={handleSubmit} />
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Chip label={`${viewPage} / 3`} color="primary" />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Link item variant="body2" onClick={() => navigate("/Login")}>
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
}
export default RegisterForm;
