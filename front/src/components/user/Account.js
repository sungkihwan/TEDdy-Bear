import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Account({ email, setEmail, password, setPassword }) {
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

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid item xs={12}>
        <TextField required fullWidth id="email" label="이메일" name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
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
          <Typography variant="caption" display="block" gutterBottom margin="normal">
            비밀번호는 4글자 이상입니다.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Account;
