import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";

import SpeakerChart from "./SpeakerChart";
import TopicChart from "./TopicChart";
import TopicLikeChart from "./TopicLikeChart";
import StudentScore from "./StudentScore";
import TopicChange from "./TopicChange";

function Prologue() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "100%", marginTop: 100 }}>
      <StudentScore></StudentScore>
      <TopicChange></TopicChange>
      <SpeakerChart></SpeakerChart>
      <TopicChart></TopicChart>
      <TopicLikeChart></TopicLikeChart>
      <div style={{ width: "100%", textAlign: "center", marginTop: 50 }}>
        <GoButton onClick={() => navigate("/media")}>
          영상 추천받으러 가기
        </GoButton>
      </div>
    </div>
  );
}

const GoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "10vw",
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

export default Prologue;
