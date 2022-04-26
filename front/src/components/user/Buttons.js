import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function Buttons({ viewPage, setViewPage, isNameValid, isFormValid, handleSubmit }) {
  const pageChecker = () => {
    if (viewPage === 1) {
      return "flex-end";
    } else {
      return "space-between";
    }
  };

  return (
    <Grid container item spacing={4} justifyContent={pageChecker}>
      {viewPage !== 1 && (
        <Grid item>
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => {
              setViewPage(viewPage - 1);
            }}
          >
            이전
          </Button>
        </Grid>
      )}
      {viewPage < 3 && (
        <Grid item>
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={!isFormValid}
            onClick={() => {
              setViewPage(viewPage + 1);
            }}
          >
            다음
          </Button>
        </Grid>
      )}
      {viewPage >= 3 && (
        <Grid item>
          <Button variant="contained" sx={{ mt: 1, mb: 2 }} disabled={!isNameValid} onClick={handleSubmit}>
            회원가입
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default Buttons;
