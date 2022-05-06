import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";

//button style
export const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "8vw",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));
