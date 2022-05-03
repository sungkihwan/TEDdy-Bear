import * as React from "react";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import * as Api from "../../../api";
import WeekForm from "./WeekForm";
import LawnInfo from "./LawnInfo";
import { LawnStyledPage } from "../styles/Style";

/** Lawn component
 *
 * @returns {component} My lawn information
 */
function Lawn({ user }) {
  //유저의 전체 리스트를 조회 -> 본 날짜만 집합으로 저장한다.
  const [watchedDays, setWatchedDays] = useState(null);
  //선택한 날짜를 저장하는 변수
  const [selectedDate, setSelectedDate] = useState(null);
  //날짜별 데이터를 받아올 변수
  const [dailyList, setDailyList] = useState(null);

  function makeDateToString(date) {
    const stringDate = `${date.getFullYear()}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    return stringDate;
  }

  useEffect(() => {
    const fetchWatchedDays = async () => {
      try {
        const newWatchedDays = new Set();
        const res = await Api.get(`viewhistorylist/${user.id}`);
        await res.data.forEach((watchedTalk) => {
          newWatchedDays.add(makeDateToString(new Date(watchedTalk.createdAt)));
        });
        setWatchedDays(newWatchedDays);
      } catch {
        console.log("시청기록을 조회할 수 없습니다.", "color: #d93d1a;");
      }
    };
    fetchWatchedDays();
  }, [dailyList, user.id]);

  if (!watchedDays) {
    return "loading...";
  }

  const arr = [];
  for (let i = 0; i > -19; i--) {
    arr.push(i);
  }

  return (
    <>
      <LawnStyledPage>
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={3}
        >
          {arr.map((num) => (
            <Grid item key={num + 18} mt={3}>
              <WeekForm
                user={user}
                weekNum={num + 18}
                dailyList={dailyList}
                setDailyList={setDailyList}
                setSelectedDate={setSelectedDate}
                watchedDays={watchedDays}
              />
            </Grid>
          ))}
        </Grid>
      </LawnStyledPage>
      <Grid item mt={3}>
        {dailyList && (
          <LawnInfo dailyList={dailyList} selectedDate={selectedDate} />
        )}
      </Grid>
    </>
  );
}

export default Lawn;
