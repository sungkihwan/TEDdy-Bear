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
  const [star, setStar] = useState(false);
  const [heart, setHeart] = useState(false);

  const talkId = videoInfo.id;
  const bookmarkId = videoInfo._id;

  const [userClick, setUserClick] = useState(() => {
    if (userState.user === null) {
      return { pointerEvents: "none" };
    } else {
      return { pointerEvents: "auto" };
    }
  });

  useEffect(() => {
    if (myBookMarkList !== undefined) {
      if (myBookMarkList[talkId]) {
        setStar(true);
      } else {
        setStar(false);
      }

      if (myLikeList[talkId]) {
        setHeart(true);
      } else {
        setHeart(false);
      }

      const node = loadCSS(
        "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
        // Inject before JSS
        document.querySelector("#font-awesome-css") || document.head.firstChild
      );
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [myBookMarkList, myLikeList, talkId]);

  const handleClickHeart = () => {
    if (heart) {
      Api.delete(`talks/talk/like/${talkId}`);
      setMyLikeList((cur) => {
        const newObj = { ...cur };
        delete newObj[talkId];
        return newObj;
      });
      setHeart(false);
    } else {
      Api.post("talks/talk/like", { talkId: talkId });
      setMyLikeList((cur) => ({ ...cur, [talkId]: { id: talkId } }));
      setHeart(true);
    }
  };

  const handleClickStar = () => {
    if (star) {
      Object.values(myBookMarkList).map((data) => {
        if (data.id === talkId) {
          Api.delete(`bookmarks/${bookmarkId}`);
        }
        setMyBookMarkList((cur) => {
          const newObj = { ...cur };
          delete newObj[talkId];
          return newObj;
        });
        setStar(false);
      });
    } else {
      Api.post("bookmarks/bookmark", { talkId: talkId });
      setMyBookMarkList((cur) => ({ ...cur, [talkId]: { id: talkId } }));
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
