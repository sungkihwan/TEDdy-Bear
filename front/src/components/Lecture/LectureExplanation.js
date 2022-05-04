import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import "./lecture.css";
import DetailedIcons from "./DetailedIcons";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";
import { useParams } from "react-router-dom";

function LectureExplanation() {
  const userState = useContext(UserStateContext);
  const params = useParams();
  const [view, setView] = useState(0);
  const [comment, setComment] = useState(() => {
    if (userState.user === null) {
      return true;
    } else {
      return false;
    }
  });
  const talkId = params.talkId;
  const [lecture, setLecture] = useState({});

  const customFetcher = (url) => {
    if (url !== undefined) {
      fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`)
        .then((res) => res.json())
        .then((json) =>
          setLecture((cur) => {
            const newData = { ...cur };
            newData["image"] = json.metadata.image;
            return newData;
          })
        );
    }
  };

  const makeSpeaker = (speakers) => {
    if (speakers !== undefined) {
      if (speakers.length === 1) {
        return speakers;
      } else {
        return speakers.join(", ");
      }
    }
  };

  const handleWatch = () => {
    const data = {
      user_id: userState.user.id,
      talkId: talkId,
    };
    Api.post("viewhistory/create", data).then((res) => console.log(res.data));
    window.open(lecture.url, "_blank");
    setView((cur) => cur + 1);
  };

  useEffect(() => {
    const fetchTalks = async () => {
      const res = await Api.get(`talks`, `${talkId}`);
      setLecture(res.data);
      customFetcher(res.data.url);
      setView(res.data.teddy_view_count);
    };
    fetchTalks();
  }, [talkId]);

  return (
    <div className="infobox">
      <div
        className="lecturebox"
        style={{ border: "2px solid black", marginTop: 100 }}
      >
        <img className="lectureimg" src={lecture.image} alt="lecture img" />
      </div>
      <div
        className="buttoncontent lecturebox"
        style={{ border: "2px solid orange" }}
      >
        {Object.keys(lecture).length !== 0 && (
          <DetailedIcons lecture={lecture} view={view}></DetailedIcons>
        )}
        <GoButton onClick={handleWatch}>영상 시청하러 가기</GoButton>
      </div>
      <div
        className="descriptionbox lecturebox"
        style={{ border: "2px solid blue" }}
      >
        <h1>제목</h1>
        <h2>{lecture.title}</h2>
      </div>
      <div
        className="descriptionbox lecturebox"
        style={{ border: "2px solid gray" }}
      >
        <h1>강연자</h1>
        <h2>{makeSpeaker(lecture.speakers)}</h2>
      </div>
      <div
        className="descriptionbox lecturebox"
        style={{ border: "2px solid purple" }}
      >
        <h1>요약</h1>
        <h2>{lecture.description}</h2>
      </div>
      <div
        className="descriptionbox lecturebox"
        style={{ border: "2px solid brown" }}
      >
        <h1>주제</h1>
        <h2>{makeSpeaker(lecture.topics)}</h2>
      </div>
      <div
        className="descriptionbox lecturebox"
        style={{ border: "2px solid brown" }}
      >
        <h1>리뷰</h1>
      </div>
      <textarea disabled={comment} wrap="on"></textarea>
      <div
        className="lecturebox"
        style={{ border: "2px solid pink", marginTop: 20, textAlign: "right" }}
      >
        <GoButton disabled={comment}>리뷰 쓰기</GoButton>
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

export default LectureExplanation;
