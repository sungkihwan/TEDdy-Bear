//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function LawnCard({ history, idx }) {
  return (
    <>
      {idx} : {history}
    </>
  );
}

export default LawnCard;
