import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Name({ name, setName, tName, setTName }) {
  const isNameValid = name.length >= 0 && tName.length >= 0;
  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }} justifyContent="center">
      <Grid item sx={{ mb: 2 }}>
        <Typography component="h1" variant="h5">
          당신과 테디 곰의 이름을 알려주세요
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField required fullWidth id="name" label="당신의 이름" name="name" value={name} autoComplete="name" onChange={(e) => setName(e.target.value)} />
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
  );
}

export default Name;
