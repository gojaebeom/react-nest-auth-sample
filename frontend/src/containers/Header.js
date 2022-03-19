import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full p-4 border-b">
      <Link to="/">홈</Link>&nbsp;
      <Link to="/login">로그인</Link>&nbsp;
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
