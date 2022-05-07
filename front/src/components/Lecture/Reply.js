import React, { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import ReplyEdit from "./ReplyEdit";
import * as Api from "../../api";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";

function Reply({
  talkId,
  parentCommentId,
  setCommentList,
  index,
  comment,
  commentList,
  usercomment_id,
}) {
  const user = useContext(UserStateContext).user;
  const [openReply, setOpenReply] = useState(false);
  const handleCommentDelete = (e) => {
    const idx = Number(e.target.name);

    Api.delete(`comments/${commentList[idx]._id}?mode=comment`).then((res) => {
      Api.get(`talks/${talkId}/comments`).then((res) => {
        setCommentList(res.data.payload);
      });
    });
  };
  return (
    <>
      <div style={{ textAlign: "right", marginRight: 15 }}>
        {user !== null && (
          <GoButton
            name={index}
            disabled={comment}
            onClick={() => setOpenReply(true)}
          >
            대댓글
          </GoButton>
        )}
        {user._id === usercomment_id && (
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
      {openReply && (
        <ReplyEdit
          setOpenReply={setOpenReply}
          talkId={talkId}
          parentCommentId={parentCommentId}
          setCommentList={setCommentList}
        ></ReplyEdit>
      )}
    </>
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

export default Reply;
