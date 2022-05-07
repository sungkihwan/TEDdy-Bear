import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { brown } from "@mui/material/colors";
import Chip from "@mui/material/Chip";

import * as Api from "../../api";
import RegisterImage from "./RegisterImage";
import UserTopics from "./UserTopics";
import Name from "./Name";
import EmailAuth from "./EmailAuth";
import RgstAccount from "./RgstAccount";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tName, setTName] = useState("테디");
  const [viewPage, setViewPage] = useState(1);
  const [userTopics, setUserTopics] = useState([]);
  const [auth, setAuth] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const topicDict = {
      기술: "technology",
      과학: "science",
      문화: "culture",
      글로벌이슈: "globalissues",
      사회: "society",
      디자인: "design",
      사회변화: "socialchange",
      비즈니스: "business",
      애니메이션: "animation",
      건강: "health",
    };

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
        bearName: tName,
        myTopics: userTopics.map((topic) => topicDict[topic]),
      });
      console.log("회원가입에 성공했습니다.");
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: 12 }}
        alignItems="stretch"
      >
        <Card sx={{ display: "flex", borderRadius: 5 }}>
          <RegisterImage />
          <Container component="main" maxWidth="xs">
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
                {viewPage === 1 && (
                  <RgstAccount
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    viewPage={viewPage}
                    setViewPage={setViewPage}
                  />
                )}
                {viewPage === 2 && (
                  <EmailAuth
                    email={email}
                    viewPage={viewPage}
                    setViewPage={setViewPage}
                    auth={auth}
                    setAuth={setAuth}
                  />
                )}
                {viewPage === 3 && (
                  <UserTopics
                    userTopics={userTopics}
                    setUserTopics={setUserTopics}
                    viewPage={viewPage}
                    setViewPage={setViewPage}
                  />
                )}
                {viewPage === 4 && (
                  <Name
                    name={name}
                    setName={setName}
                    tName={tName}
                    setTName={setTName}
                    viewPage={viewPage}
                    setViewPage={setViewPage}
                    handleSubmit={handleSubmit}
                  />
                )}
                <Grid container item alignItems="flex-end" mt={2}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Chip label={`${viewPage} / 4`} />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Link
                      item
                      variant="body2"
                      color={brown[900]}
                      onClick={() => navigate("/Login")}
                    >
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
