import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import styled from "styled-components";

/**
 * main color
 */
export const theme = createTheme({
  brown: {
    light: brown[300],
    main: brown[500],
    dark: brown[900],
  },
});

/**
 * Main page text style
 */
export const MainText = styled.div`
  font-size: 30px;
  color: ${theme.brown.main};
`;
