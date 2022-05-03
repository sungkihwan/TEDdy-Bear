import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { loadCSS } from "fg-loadcss";
import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import { MyTalksContext } from "../common/MyTalksContext";

function Icons({ videoInfo }) {
  const userState = useContext(UserStateContext);
  const { myLikeList, myBookMarkList, setMyLikeList, setMyBookMarkList } =
    useContext(MyTalksContext);
  const talkId = videoInfo.talkId ? videoInfo.talkId : videoInfo.id;

  const [userClick, setUserClick] = useState(() => {
    if (userState.user === null) {
      return { pointerEvents: "none" };
    } else {
      return { pointerEvents: "auto" };
    }
  });

  const [star, setStar] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    for (let i = 0; i < myBookMarkList.length; i++) {
      if (talkId === myBookMarkList[i].talk.id) {
        setStar(true);
      }
    }
    for (let i = 0; i < myLikeList.length; i++) {
      if (talkId === myLikeList[i].talk_id.id) {
        setHeart(true);
      }
    }

    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleClickHeart = () => {
    if (heart) {
      Api.delete(`talks/talk/like/${talkId}`);
      setMyLikeList((cur) => {
        const newArr = [...cur];
        return newArr.slice(0, -1);
      });
      setHeart(false);
    } else {
      Api.post("talks/talk/like", { talkId: talkId });
      setMyLikeList((cur) => [...cur, { talk_id: { id: talkId } }]);
      setHeart(true);
    }
  };
  const handleClickStar = () => {
    let bookmark_id;
    if (star) {
      for (let i = 0; i < myBookMarkList.length; i++) {
        bookmark_id = myBookMarkList[i].bookmark_id;
        if (talkId === myBookMarkList[i].talk.id) {
          Api.delete(`bookmarks/${myBookMarkList[i].bookmark_id}`);

          setMyBookMarkList((cur) => {
            const newArr = [...cur];
            return newArr.slice(0, -1);
          });
        }
      }
      setStar(false);
    } else {
      Api.post("bookmarks/bookmark", { talkId: talkId });
      setMyBookMarkList((cur) => [
        ...cur,
        { talk: { id: talkId }, bookmark_id: bookmark_id },
      ]);
      setStar(true);
    }
  };

  return (
    <div>
      {heart ? (
        <FavoriteIcon
          sx={{ color: "#e91e63", fontSize: 40, cursor: "pointer" }}
          style={userClick}
          onClick={handleClickHeart}
        ></FavoriteIcon>
      ) : (
        <FavoriteIcon
          sx={{ color: "#D7CCC8", fontSize: 40, cursor: "pointer" }}
          style={userClick}
          onClick={handleClickHeart}
        ></FavoriteIcon>
      )}
      {star ? (
        <StarIcon
          sx={{ color: "#EAE10B", fontSize: 40, cursor: "pointer" }}
          style={userClick}
          onClick={handleClickStar}
        ></StarIcon>
      ) : (
        <StarIcon
          sx={{ color: "#D7CCC8", fontSize: 40, cursor: "pointer" }}
          style={userClick}
          onClick={handleClickStar}
        ></StarIcon>
      )}
    </div>
  );
}

export default Icons;
