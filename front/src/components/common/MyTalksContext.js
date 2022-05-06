import React, { createContext, useEffect, useState } from "react";
import * as Api from "../../api";

const MyTalksContext = createContext(null);

function MyTalksProvider({ children }) {
  const [myLikeList, setMyLikeList] = useState();
  const [myBookMarkList, setMyBookMarkList] = useState();

  useEffect(() => {
    Api.get("bookmarks")
      .then((res) => {
        setMyBookMarkList(res.data.payload);
      })
      .catch((err) => {
        console.log("북마크 리스트가 없습니다!");
      });

    Api.get("likes/my").then((res) => {
      setMyLikeList(res.data.payload);
    });
  }, []);

  const myTalks = {
    myLikeList,
    myBookMarkList,
    setMyBookMarkList,
    setMyLikeList,
  };

  return (
    <MyTalksContext.Provider value={myTalks}>
      {children}
    </MyTalksContext.Provider>
  );
}

export { MyTalksContext, MyTalksProvider };
