import { authService } from "myFirebase";

const Header = () => {
  return (
    <button
      onClick={() => {
        authService.signOut();
      }}
    >
      로그아웃
    </button>
  );
};

export default Header;
