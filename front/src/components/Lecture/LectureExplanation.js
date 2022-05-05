import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import "./lecture.css";
import DetailedIcons from "./DetailedIcons";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import ReplyEdit from "./ReplyEdit";
function LectureExplanation() {
  const userState = useContext(UserStateContext);
  const params = useParams();
  const [commentList, setCommentList] = useState([]);
  const [view, setView] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  console.log(commentList);
  const [comment, setComment] = useState(() => {
    if (userState.user === null) {
      return true;
    } else {
      return false;
    }
  });
  const [userComment, setUserComment] = useState("");
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

  useEffect(() => {
    Api.get(`talks/${talkId}/comments`).then((res) => {
      setCommentList(res.data.payload);
    });
  }, [talkId]);

  const handleCommentWrite = () => {
    const data = {
      mode: "comment",
      talkId: talkId,
      comment: userComment,
    };
    Api.post("comments/comment", data).then((res) => {
      Api.get(`talks/${talkId}/comments`).then((res) => {
        setCommentList(res.data.payload);
      });
    });
    setUserComment("");
  };

  const handleReplyDelete = (e) => {
    console.log(e.target.name);
    const num = e.target.name;
    const commentIndex = Number(num[0]);
    const replyIndex = Number(num[1]);
    const data = {
      mode: "reply",
    };
    Api.commentDelete(
      `comments/${commentList[commentIndex].reply[replyIndex]._id}`,
      data
    ).then((res) => {
      Api.get(`talks/${talkId}/comments`).then((res) => {
        setCommentList(res.data.payload);
      });
    });
  };

  const handleCommentDelete = (e) => {
    const idx = Number(e.target.name);
    const data = {
      mode: "comment",
    };
    Api.commentDelete(`comments/${commentList[idx]._id}`, data).then((res) => {
      Api.get(`talks/${talkId}/comments`).then((res) => {
        setCommentList(res.data.payload);
      });
    });
  };
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

      <div
        className="commentbox lecturebox"
        style={{ border: "2px solid blue" }}
      >
        {commentList.length !== 0 &&
          commentList.map((usercomment, index) => (
            <div key={index}>
              <div className="comment">
                <h4>{usercomment.user.name}</h4>
                <p>{usercomment.comment}</p>
              </div>
              {usercomment.reply.length !== 0 &&
                usercomment.reply.map((reply, i) => (
                  <div key={i}>
                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        border: "2px solid black",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          width: "10%",
                          height: "70px",
                          border: "2px solid red",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            height: "35px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "50%",
                            height: "35px",
                            borderLeft: "2px dotted black",
                            borderBottom: "2px dotted black",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          width: "90%",
                          height: "70px",
                          border: "2px solid green",
                          textAlign: "left",
                        }}
                      >
                        <div className="reply">
                          <h4 style={{ padding: 0, margin: 0 }}>
                            {reply.user.name}
                          </h4>
                          <p style={{ padding: 0, margin: 10 }}>
                            {reply.comment}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <GoButton
                            name={`${index}${i}`}
                            style={{ marginTop: "10px" }}
                            onClick={handleReplyDelete}
                          >
                            삭제
                          </GoButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div style={{ width: "100%", textAlign: "right" }}>
                {openReply && (
                  <ReplyEdit
                    setOpenReply={setOpenReply}
                    talkId={talkId}
                    parentCommentId={usercomment._id}
                    setCommentList={setCommentList}
                  ></ReplyEdit>
                )}
                {userState.user !== null && (
                  <GoButton
                    name={index}
                    disabled={comment}
                    onClick={() => setOpenReply(true)}
                  >
                    대댓글
                  </GoButton>
                )}
                {userState.user._id === usercomment.user._id && (
                  <GoButton
                    name={index}
                    onClick={handleCommentDelete}
                    disabled={comment}
                    style={{ marginLeft: "10px" }}
                  >
                    댓글 삭제
                  </GoButton>
                )}
              </div>
            </div>
          ))}
      </div>
      <textarea
        disabled={comment}
        value={userComment}
        onChange={(e) => setUserComment(e.target.value)}
        wrap="on"
      ></textarea>
      <div
        className="lecturebox"
        style={{ border: "2px solid pink", marginTop: 20, textAlign: "right" }}
      >
        <GoButton disabled={comment} onClick={handleCommentWrite}>
          리뷰 쓰기
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

export default LectureExplanation;
