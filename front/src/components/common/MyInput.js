import styled from "styled-components";
import { brown } from "@mui/material/colors";

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
