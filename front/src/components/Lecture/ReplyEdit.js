import "./styles/lecture.css";
import { MyButton } from "../common/MyButton";
import React, { useState } from "react";
import * as Api from "../../api";

function ReplyEdit({ setOpenReply, talkId, parentCommentId, setCommentList }) {
  const [reply, setReply] = useState("");
  const handleReply = () => {
    const data = {
      mode: "reply",
      talkId: talkId,
      parentCommentId: parentCommentId,
      comment: reply,
    };

    Api.post("comments/comment", data).then((res) =>
      Api.get(`talks/${talkId}/comments`).then((res) => {
        setCommentList(res.data.payload);
      })
    );
    setReply("");
    setOpenReply(false);
  };
  return (
    <div
      style={{
        width: "98%",
        height: "130px",
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px",
        textAlign: "right",
        marginTop: 10,
      }}
    >
      <textarea
        className="replytext"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <div style={{ marginTop: "5px" }}>
        <MyButton onClick={handleReply}>확인</MyButton>
        <MyButton
          style={{ marginLeft: "10px" }}
          onClick={() => setOpenReply(false)}
        >
          취소
        </MyButton>
      </div>
    </div>
  );
}

export default ReplyEdit;
