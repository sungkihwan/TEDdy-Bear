import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { loadCSS } from "fg-loadcss";
import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function Icons({ videoInfo }) {
  const userId = useContext(UserStateContext).user.id;
  const talkId = videoInfo.id;

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  const [star, setStar] = useState(true);
  const [heart, setHeart] = useState(true);

  const editLikes = async () => {
    if (heart === true) {
      Api.delete(`talks/talk/like/${talkId}`, {
        user_id: userId,
        talk_id: talkId,
      });
    } else {
      Api.post(`talks/talk/like`, { user_id: userId, talk_id: talkId });
    }
    setHeart((cur) => !cur);
  };

  const editBookMark = async () => {
    if (star === true) {
      Api.delete(`bookmarks/${userId}`, { talkId: videoInfo.id });
    } else {
      Api.post(`bookmarks/${userId}`, { talkId: videoInfo.id });
    }
    setStar((cur) => !cur);
  };

  return (
    <div>
      {heart ? (
        <FavoriteIcon
          sx={{ color: "#e91e63", fontSize: 40, cursor: "pointer" }}
          onClick={editLikes}
        ></FavoriteIcon>
      ) : (
        <FavoriteIcon
          sx={{ color: "#D7CCC8", fontSize: 40, cursor: "pointer" }}
          onClick={editLikes}
        ></FavoriteIcon>
      )}
      {star ? (
        <StarIcon
          sx={{ color: "#EAE10B", fontSize: 40, cursor: "pointer" }}
          onClick={editBookMark}
        ></StarIcon>
      ) : (
        <StarIcon
          sx={{ color: "#D7CCC8", fontSize: 40, cursor: "pointer" }}
          onClick={editBookMark}
        ></StarIcon>
      )}
    </div>
  );
}

export default Icons;
