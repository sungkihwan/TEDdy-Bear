import styled from "styled-components";
import { brown } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

//input style
export const MyInput = styled.input`
  background-color: ${brown[100]};
  width: 500px;
  height: 25px;
  border-radius: 10px;
  padding: 5px;
  border: 1px solid ${brown[800]};
  color: ${brown[900]};
`;

//input style
export const MyAccountInput = styled(TextField)(() => ({
  backgroundColor: brown[100],
  borderColor: brown[800],
  color: brown[900],

  "& label.Mui-focused": {
    color: brown[900],
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: brown[800],
    },
  },
}));
