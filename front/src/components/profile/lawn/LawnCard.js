//import styled from "styled-components";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import * as Api from "../../../api";

function LawnCard({ talkId, idx }) {
  const [talkInfo, setTalkInfo] = useState(null);
  useEffect(() => {
    const fetchWatchedDays = async () => {
      try {
        const res = await Api.get(`talks/${talkId}`);
        console.log(res);
        setTalkInfo(res.data);
      } catch {
        console.log("영상 정보를 찾을 수 없습니다.", "color: #d93d1a;");
      }
    };
    fetchWatchedDays();
  }, []);
  return (
    <Card variant="outlined">
      {idx} : {talkId.talkId}
    </Card>
  );
}

export default LawnCard;
