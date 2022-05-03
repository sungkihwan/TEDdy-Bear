import * as React from "react";
import Grid from "@mui/material/Grid";

import { MyButton } from "../common/MyButton";

function Buttons({
  viewPage,
  setViewPage,
  isNameValid,
  isFormValid,
  handleSubmit,
}) {
  const pageChecker = viewPage === 1 ? "flex-end" : "space-between";
  return (
    <Grid container item spacing={4} justifyContent={pageChecker}>
      {viewPage !== 1 && (
        <Grid item>
          <MyButton
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => {
              setViewPage(viewPage - 1);
            }}
          >
            이전
          </MyButton>
        </Grid>
      )}
      {viewPage < 4 && (
        <Grid item>
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
      )}
      {viewPage >= 4 && (
        <Grid item>
          <MyButton
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={!isNameValid}
            onClick={handleSubmit}
          >
            회원가입
          </MyButton>
        </Grid>
      )}
    </Grid>
  );
}

export default Buttons;
