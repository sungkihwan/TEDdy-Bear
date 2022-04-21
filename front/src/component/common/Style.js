import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import styled from "styled-components";

export const theme = createTheme({
  brown: {
    light: brown[300],
    main: brown[500],
    dark: brown[900],
  },
});

/**
 * Main 페이지 글씨 스타일입니다.
 */
export const MainText = styled.div`
  font-size: 30px;
  color: ${theme.brown.main};
`;
