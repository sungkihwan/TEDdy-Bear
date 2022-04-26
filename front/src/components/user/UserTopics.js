import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

function UserTopics({ userTopics, setUserTopics }) {
  const topTopics = [
    ["테디곰!", "TEDdy Bear"],
    ["기술", "technology"],
    ["과학", "science"],
    ["문화", "culture"],
    ["글로벌이슈", "globalissues"],
    ["사회", "society"],
    ["디자인", "design"],
    ["사회변화", "socialchange"],
    ["비즈니스", "business"],
    ["애니메이션", "animation"],
    ["건강", "health"],
  ];

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }} justifyContent="center">
      <Grid item sx={{ mb: 2 }}>
        <Typography component="h1" variant="h5">
          좋아하는 주제가 있나요?
        </Typography>
      </Grid>
      <Grid item xs={12} justifyContent="center">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={topTopics.map((topic) => topic[0])}
          defaultValue={[topTopics[0]]}
          value={userTopics}
          onChange={(event, newValue) => {
            setUserTopics(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="주제" placeholder="고르지 않으셔도 돼요 :)" />}
        />
        <Grid item>
          <Typography variant="caption" display="block" gutterBottom sx={{ mt: 1 }}>
            (혹시 몰라 좋아할만한 주제를 미리 골라뒀어요!)
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserTopics;