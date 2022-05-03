import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { loadCSS } from "fg-loadcss";
import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function Icons({ talkId }) {
  const userState = useContext(UserStateContext);
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
  const [userClick, setUserClick] = useState(() => {
    if (userState.user === null) {
      return { pointerEvents: "none" };
    } else {
      return { pointerEvents: "auto" };
    }
  });

  const [star, setStar] = useState(() => {
    if (userState.user === null) {
      return false;
    } else {
      return true;
    }
  });
  const [heart, setHeart] = useState(() => {
    if (userState.user === null) {
      return false;
    } else {
      return true;
    }
  });
  const handleClickHeart = () => {
    if (heart) {
      Api.delete("talks/talk/like", talkId);
      setHeart(false);
    } else {
      Api.post("talks/talk/like", { talkId: talkId });
      setHeart(true);
    }
  };
  const handleClickStar = () => {
    if (star) {
      setStar(false);
    } else {
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
