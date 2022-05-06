import React, { useState, useEffect, useReducer, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/main/Main";
import UserPage from "./components/profile/UserPage";
import Prologue from "./components/prologue/Prologue";
import Lecture from "./components/Lecture/Lecture";
import MyTalks from "./components/user/MyTalks";
import LectureExplanation from "./components/Lecture/LectureExplanation";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import Community from "./components/user/Community";
import Loading from "./components/common/Loading";
import EditProfile from "./components/profile/EditProfile";
import FindPassword from "./components/user/FindPassword";

import * as Api from "./api";
import { loginReducer } from "./reducer";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/prologue" element={<Prologue />} />
          <Route path="/mytalks" element={<MyTalks />} />
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="/users/edit" element={<EditProfile />} />
          <Route path="/gommunity" element={<Community />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/media" element={<Lecture />} />
          <Route path="/media/:talkId" element={<LectureExplanation />} />
          <Route path="findpassword" element={<FindPassword />} />
        </Routes>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
