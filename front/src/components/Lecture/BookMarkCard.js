import Carousel from "react-elastic-carousel";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LectureInfo from "./LectureInfo";
import "./lecture.css";
import * as Api from "../../api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 300,
  height: 250,
  marginBottom: 10,
  marginLeft: 40,
  marginTop: 20,
}));

function BookmarkCard({ lectureData, type, cname = "" }) {
  const userState = useContext(UserStateContext);

  const customFetcher = async (url) => {
    const response = await fetch(
      `https://rlp-proxy.herokuapp.com/v2?url=${url}`
    );
    const json = await response.json();

    for (const prop in lectureData) {
      if (lectureData[prop].url === url) {
        json.metadata.title = lectureData[prop].title + " - ";
        for (let j = 0; j < lectureData[prop].speakers.length; j++) {
          json.metadata.title += lectureData[prop].speakers[j];
          if (lectureData[prop].speakers.length >= 2) {
            json.metadata.title += ", ";
          }
        }
        break;
      }
    }

    json.metadata.description = "";
    return json.metadata;
  };

  const handleOnClick = (data) => {
    const sendData = {
      user_id: userState.user.id,
      talkId: data.talk.id,
      url: data.talk.url,
    };
    Api.post("viewhistory/create", sendData);
    window.open(data.url, "_blank");
  };

  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <div className={cname}>
          <h1
            style={{
              marginLeft: "20px",
              verticalAlign: "middle",
              color: "#795548",
            }}
          >
            {type}
          </h1>
        </div>
        {lectureData.length !== 0 ? (
          <Carousel itemsToShow={3}>
            {Object.keys(lectureData).map((data, index) => (
              <div className="cardbox" key={index}>
                <Item onClick={() => handleOnClick(data)}>
                  <div>
                    <LinkPreview
                      url={lectureData[data].url}
                      fetcher={customFetcher}
                      width="300px"
                      height="250px"
                      fallback={<div>Fallback</div>}
                    />
                  </div>
                </Item>
                <LectureInfo videoInfo={lectureData[data]}></LectureInfo>
              </div>
            ))}
          </Carousel>
        ) : (
          <div
            style={{
              width: "100%",
              height: 200,
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <h1>관심있는 토픽을 추가해보세요</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default BookmarkCard;
