import React from "react";
import { GoogleLogin } from "react-google-login";

function GoogleLoginBtn({ responseGoogle }) {
  const clinetId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleLogin
      clientId={ clinetId ? clinetId : console.log("GOOGLE_CLIENT_ID가 없습니다.") }
      buttonText="구글로 로그인"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleLoginBtn;
