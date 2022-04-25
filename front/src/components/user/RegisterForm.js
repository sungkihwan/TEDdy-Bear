import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import Account from "./Account";
import TeddyImage from "./TeddyImage";
import UserTopics from "./UserTopics";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tName, setTName] = useState("테디");
  const [tempPage, setTempPage] = useState(1);
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

  const Buttons = () => {
    const PrevButton = () => {
      if (tempPage !== 1) {
        return (
          <Grid item>
            <Button
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
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
              sx={{ mt: 1, mb: 2 }}
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
            <Button variant="contained" sx={{ mt: 1, mb: 2 }} disabled={!isNameValid} onClick={handleSubmit}>
              회원가입
            </Button>
          </Grid>
        );
      }
    };

    return (
      <Grid container item spacing={4} justifyContent={pageChecker}>
        <PrevButton />
        <NextButton />
      </Grid>
    );
  };

  const pageChecker = () => {
    if (tempPage === 1) {
      return "flex-end";
    } else {
      return "space-between";
    }
  };

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
                {tempPage === 1 && (
                  <Grid container spacing={2} sx={{ alignItems: "center" }} justifyContent="center">
                    <Grid item sx={{ mb: 2 }}>
                      <Typography component="h1" variant="h5">
                        테디 곰의 가족이 되어주세요!
                      </Typography>
                    </Grid>
                    <Account email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                  </Grid>
                )}
                {tempPage === 2 && <UserTopics />}
                {tempPage === 3 && (
                  <Grid container spacing={2} sx={{ alignItems: "center" }} justifyContent="center">
                    <Grid item sx={{ mb: 2 }}>
                      <Typography component="h1" variant="h5">
                        당신과 테디 곰의 이름을 알려주세요
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="당신의 이름"
                        name="name"
                        value={name}
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="tName"
                        label="테디 곰의 이름"
                        type="name"
                        id="tName"
                        value={tName}
                        autoComplete="name"
                        onChange={(e) => setTName(e.target.value)}
                      />
                    </Grid>
                    {!isNameValid && (
                      <Typography variant="caption" display="block" gutterBottom>
                        이름은 공백일 수 없습니다.
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid container item alignItems="flex-end">
                  <Buttons />
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Chip label={`${tempPage} / 3`} color="primary" />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link variant="body2" onClick={() => navigate("/Login")}>
                        이미 계정이 있나요?
                      </Link>
                    </Grid>
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
