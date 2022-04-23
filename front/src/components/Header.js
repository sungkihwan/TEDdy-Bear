import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "./common/Style";
import { useNavigate } from "react-router-dom";
import { DispatchContext, UserStateContext } from "../App";

/** header component
 *
 * @returns {component} header
 */
export default function Header() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    // delete sessionStorage JWT token
    sessionStorage.removeItem("userToken");
    // use dispatch, logout
    dispatch({ type: "LOGOUT" });
    // go to main page
    navigate("/");
  };

  return (
    <Nav>
      <Logo onClick={() => navigate("/")} src="/logo.png" />
      <Menu>
        <Link onClick={() => navigate("/prologue")}>프롤로그</Link>
        {!isLogin && <Link onClick={() => navigate("/login")}>로그인</Link>}
        {isLogin && (
          <>
            <Link onClick={() => navigate("/mypage")}>내 정보</Link>
            <Link onClick={logout}>로그아웃</Link>
          </>
        )}
      </Menu>
    </Nav>
  );
}

//nav style
const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  /* height: 4vh; */
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${theme.brown.light};
  z-index: 2;
`;

//logo style
const Logo = styled.img`
  /* width: 15vh; */
  width:50;
  /* height: 5vh; */
  height: 80%;
  cursor: pointer;
  flex-shrink: 0;
`;

//menu style
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

const Link = styled.div`
  color: ${theme.brown.dark};
  cursor: pointer;
  margin: 0 10px;
`;
