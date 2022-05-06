import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Account from "./Account";
import { MyButton } from "../common/MyButton";

function RgstAccount({
  email,
  setEmail,
  password,
  setPassword,
  viewPage,
  setViewPage,
}) {
  console.log(email, password, viewPage);
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
    <Grid
      container
      spacing={2}
      sx={{ alignItems: "center" }}
      justifyContent="center"
    >
      <Grid item sx={{ mb: 3 }}>
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
      <Grid container justifyContent="flex-end" mr={2}>
        <MyButton
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={!isFormValid}
          onClick={() => {
            setViewPage(viewPage + 1);
          }}
        >
          다음
        </MyButton>
      </Grid>
    </Grid>
  );
}
export default RgstAccount;
