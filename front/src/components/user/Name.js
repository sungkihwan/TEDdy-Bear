import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MyButton } from "../common/MyButton";
import { MyAccountInput } from "../common/MyInput";

function Name({
  name,
  setName,
  tName,
  setTName,
  viewPage,
  setViewPage,
  handleSubmit,
}) {
  const isNameValid = name.length >= 0 && tName.length >= 0;
  return (
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
        <MyAccountInput
          required
          fullWidth
          id="name"
          label="당신의 이름"
          name="name"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <MyAccountInput
          required
          fullWidth
          name="tName"
          label="테디 곰의 이름"
          type="name"
          id="tName"
          value={tName}
          autoComplete="off"
          onChange={(e) => setTName(e.target.value)}
        />
      </Grid>
      {!isNameValid && (
        <Typography variant="caption" display="block" gutterBottom>
          이름은 공백일 수 없습니다.
        </Typography>
      )}
      <Grid container justifyContent="space-between" ml={2} mr={1}>
        <MyButton
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          onClick={() => {
            setViewPage(viewPage - 1);
          }}
        >
          이전
        </MyButton>
        <MyButton
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={!isNameValid}
          onClick={handleSubmit}
        >
          회원가입
        </MyButton>
      </Grid>
    </Grid>
  );
}

export default Name;
