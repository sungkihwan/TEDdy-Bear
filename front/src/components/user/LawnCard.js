//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function LawnCard({ talk, idx }) {
  return (
    <>
      {idx} : {talk.talkId}
    </>
  );
}

export default LawnCard;
