import React from "react";
import styled from "styled-components";
import { theme } from "./common/Style";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Nav>
      <LogoLink onClick={() => navigate("/")}>
        <Logo src="/logo.png" />
      </LogoLink>
      <Link onClick={() => navigate("/login")}>프롤로그</Link>
      <Link onClick={() => navigate("/login")}>회원가입</Link>
      <Link onClick={() => navigate("/login")}>로그인</Link>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 10vh;
`;

const LogoLink = styled.div`
  color: ${theme.brown.dark};
  cursor: pointer;
  margin-right: 50%;
`;

const Logo = styled.img`
  width: 21vh;
  height: 7vh;
`;

const Link = styled.div`
  color: ${theme.brown.dark};
  cursor: pointer;
`;
