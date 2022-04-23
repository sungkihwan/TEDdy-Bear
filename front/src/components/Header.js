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
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
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
  height: 4vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${theme.brown.light};
  z-index: 2;
`;

//logo style
const Logo = styled.img`
  width: 15vh;
  height: 5vh;
  cursor: pointer;
  flex-shrink: 0;
`;

//menu style
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const Link = styled.div`
  color: ${theme.brown.dark};
  cursor: pointer;
  margin: 0 10px;
`;
