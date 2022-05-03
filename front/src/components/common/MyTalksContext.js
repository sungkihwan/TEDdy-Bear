import React, { createContext, useEffect, useState } from "react";
import * as Api from "../../api";

const MyTalksContext = createContext(null);

function MyTalksProvider({ children }) {
  const [myLikeList, setMyLikeList] = useState([]);
  const [myBookMarkList, setMyBookMarkList] = useState([]);

  useEffect(() => {
    Api.get("bookmarks").then((res) => {
      setMyBookMarkList(res.data.bookmarks);
    });
    Api.get("likes/my").then((res) => {
      console.log(res.data);
      setMyLikeList(res.data);
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
