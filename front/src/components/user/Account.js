import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { MyAccountInput } from "../common/MyInput";

function Account({
  email,
  setEmail,
  password,
  setPassword,
  isEmailValid,
  isPasswordValid,
}) {
  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid item xs={12}>
        <MyAccountInput
          required
          fullWidth
          id="email"
          label="이메일"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && (
          <Typography variant="caption" display="block" gutterBottom>
            이메일 형식이 올바르지 않습니다.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <MyAccountInput
          required
          fullWidth
          name="password"
          label="비밀번호"
          value={password}
          type="password"
          id="password"
          autoComplete="off"
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
}

export default Account;
