<<<<<<< HEAD:front/src/component/prologue/Prologue.js
import React from "react";
import SpeakerChart from './SpeakerChart';
import TopicChart from './TopicChart';
import TopicLikeChart from './TopicLikeChart';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

=======
>>>>>>> 0f79f414d3e38aaf7bf34228e39c5228e86375cf:front/src/components/prologue/Prologue.js
function Prologue() {
  const navigate = useNavigate();
  return (
<<<<<<< HEAD:front/src/component/prologue/Prologue.js
    <div style={{width:'100%', height:'100%', marginTop: 100}}>
      <SpeakerChart></SpeakerChart>
      <TopicChart></TopicChart>
      <TopicLikeChart></TopicLikeChart>
      <GoButton onClick={() => navigate("/media")}>영상 추천받으러 가기</GoButton>
=======
    <div>
      <div>프롤로그 페이지입니다.</div>
>>>>>>> 0f79f414d3e38aaf7bf34228e39c5228e86375cf:front/src/components/prologue/Prologue.js
    </div>
  );
}

const GoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "10vw",
  marginTop:20,
  marginLeft:'50%',
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

export default Prologue;
