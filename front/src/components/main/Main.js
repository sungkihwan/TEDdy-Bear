import Description1 from "./Description1";
import Description2 from "./Description2";
import Description3 from "./Description3";
import Description4 from "./Description4";

import React, { useState, useContext, useNaviagate } from "react";

/** Main pages component
 *
 * @returns {component} Main page
 */
export default function Main() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <>
      <div style={{ position: "relative", marginTop: "10vh" }}>
        <Description1 />
        <Description2 />
        <Description3 />
        <Description4 />
      </div>
    </>
  );
}
