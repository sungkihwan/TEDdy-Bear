import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { brown } from "@mui/material/colors";
import { MyButton } from "../common/MyButton";

function UserTopics({ userTopics, setUserTopics, viewPage, setViewPage }) {
  const topTopics = [
    "기술",
    "과학",
    "문화",
    "글로벌이슈",
    "사회",
    "디자인",
    "사회변화",
    "비즈니스",
    "애니메이션",
    "건강",
  ];

  return (
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
          defaultValue={topTopics[0]}
          value={userTopics}
          sx={{
            backgroundColor: brown[100],
            "& label.Mui-focused": {
              color: brown[900],
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: brown[800],
              },
            },
          }}
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
      </Grid>
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

export default UserTopics;
