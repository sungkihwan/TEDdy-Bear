import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadCSS } from "fg-loadcss";
// import StarIcon from '@mui/icons-material/Star';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Icons from "./Icons";

function LectureInfo({ videoInfo }) {
  const talkId = videoInfo.talkId ? videoInfo.talkId : videoInfo.id;
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

  const handleInfo = () => {
    navigate(`/media/${talkId}`);
  };
  // const [star, setStar] = useState(true);
  // const [heart, setHeart] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "40px",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Icons videoInfo={videoInfo}></Icons>
        </div>
        <h2 style={{ cursor: "pointer" }} onClick={handleInfo}>
          자세히 보기
        </h2>
      </div>
    </>
  );
}

export default LectureInfo;
