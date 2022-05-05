import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { loadCSS } from "fg-loadcss";
import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import { MyTalksContext } from "../common/MyTalksContext";

function DetailedIcons({ lecture, view }) {
  console.log(lecture);
  console.log("아이콘 렌더링!");
  const { myLikeList, myBookMarkList, setMyLikeList, setMyBookMarkList } =
    useContext(MyTalksContext);
  const [star, setStar] = useState(false);
  const [heart, setHeart] = useState(false);
  const [like, setLike] = useState(() => lecture.teddy_like_count);
  console.log(like);
  const userState = useContext(UserStateContext);

  const talkId = lecture.id;
  const bookmarkId = lecture._id;

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

      for (let i = 0; i < myLikeList.length; i++) {
        if (talkId === myLikeList[i].talk_id.id) setHeart(true);
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

  const handleClickHeart = async () => {
    if (heart) {
      await Api.delete(`talks/talk/like/${talkId}`);
      setMyLikeList((cur) => {
        const newArr = [...cur];
        return newArr.slice(0, -1);
      });
      setHeart(false);
      setLike((cur) => cur - 1);
    } else {
      await Api.post("talks/talk/like", { talkId: talkId });
      setMyLikeList((cur) => [...cur, { talk_id: { id: talkId } }]);
      setHeart(true);
      setLike((cur) => cur + 1);
    }
  };

  const handleClickStar = async () => {
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
      await Api.post("bookmarks/bookmark", { talkId: talkId });
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
      <span>{like}</span>
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
      <RemoveRedEyeIcon sx={{ color: "#4f4545", fontSize: 40 }} />
      <span>{view}</span>
    </div>
  );
}

export default DetailedIcons;
