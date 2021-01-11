import { authService, googleProvider } from "myFirebase";
import React from "react";

const Auth = () => {
  return (
    <div>
      <button
        onClick={async () =>
          await authService.signInWithRedirect(googleProvider)
        }
      >
        구글 로그인
      </button>
    </div>
  );
};

export default Auth;
