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
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tName, setTName] = useState("테디");
  const [tempPage, setTempPage] = useState(1);
  const [userTopics, setUserTopics] = useState(["테디 곰!"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
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
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

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
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={!isFormValid}
            onClick={handleSubmit}
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

  const topTopics = [
    "테디곰!",
    "기술",
    "과학",
    "문화",
    "글로벌 이슈",
    "사회",
    "디자인",
    "사회변화",
    "비즈니스",
    "애니메이션",
    "건강",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: 12 }}
        alignItems="stretch"
      >
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
                marginTop: 4,
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
                {tempPage === 1 && (
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
                        value={email}
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
                        value={password}
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
                )}
                {tempPage === 2 && (
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
                    <Grid item xs={12} justifyContent="center">
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={topTopics}
                        defaultValue={[topTopics[0]]}
                        value={userTopics}
                        onChange={(event, newValue) => {
                          setUserTopics(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="주제"
                            placeholder="고르지 않으셔도 돼요 :)"
                          />
                        )}
                      />
                      <Grid item>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          sx={{ mt: 2 }}
                        >
                          (혹시 몰라 좋아할만한 주제를 미리 골라뒀어요!)
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {tempPage === 3 && (
                  <Grid
                    container
                    spacing={2}
                    sx={{ alignItems: "center" }}
                    justifyContent="center"
                  >
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
                  </Grid>
                )}
                <Grid container item alignItems="flex-end">
                  <Grid container item spacing={4} justifyContent={pageChecker}>
                    <PrevButton />
                    <NextButton />
                  </Grid>
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
