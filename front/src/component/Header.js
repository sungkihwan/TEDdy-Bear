import React from "react";
import styled from "styled-components";
import { theme } from "./common/Style";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo onClick={() => navigate("/")} src="/logo.png" />
      <Menu>
        <Link onClick={() => navigate("/prologue")}>프롤로그</Link>
        <Link onClick={() => navigate("/register")}>회원가입</Link>
        <Link onClick={() => navigate("/login")}>로그인</Link>
      </Menu>
    </Nav>
  );
}

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

const Logo = styled.img`
  width: 15vh;
  height: 5vh;
  cursor: pointer;
  flex-shrink: 0;
`;

const Link = styled.div`
  color: ${theme.brown.dark};
  cursor: pointer;
  margin: 0 10px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;
