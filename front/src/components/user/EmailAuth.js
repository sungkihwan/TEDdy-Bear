import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Timer from "./Timer";
import { MyButton } from "../common/MyButton";
import * as Api from "../../api";
import Box from "@mui/material/Box";

function EmailAuth({ email, setButtonAct, buttonAct }) {
  useEffect(() => {
    if (!auth) {
      setButtonAct(false);
    }
  }, [buttonAct, setButtonAct]);
  const [timer, setTimer] = useState(false);
  const [auth, setAuth] = useState(false);
  const [code, setCode] = useState("");
  const handleAuthGetCode = () => {
    setTimer(false);
    Api.post("user/mail", { email: email, type: "a" }).then((res) => {
      setTimer(true);
    });
  };
  const hanldeAuth = () => {
    Api.post("user/check/code", { code: code }).then((res) => {
      if (res.data === true) {
        setAuth(true);
        setButtonAct(true);
        setTimer(false);
      } else {
        setAuth(false);
      }
    });
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center" }}
        justifyContent="center"
      >
        <Grid item sx={{ mb: 2 }}>
          <Typography component="h1" variant="h5">
            이메일 인증
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            value={email}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <MyButton style={{ width: 120 }} onClick={handleAuthGetCode}>
            인증번호 전송
          </MyButton>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            id="code"
            label="인증 코드"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <MyButton style={{ width: 120 }} onClick={hanldeAuth}>
            인증하기
          </MyButton>
        </Grid>
        {timer && <Timer setTimer={setTimer}></Timer>}
        {auth && <h4>인증 되었습니다.</h4>}
      </Grid>
    </Box>
  );
}

export default EmailAuth;
