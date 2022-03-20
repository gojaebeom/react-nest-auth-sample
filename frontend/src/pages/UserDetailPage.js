import axios from "axios";
import { Header } from "containers";
import { withPrivate } from "HOC";
import { useUser } from "hooks";
import { useEffect } from "react";
import { customAxios } from "utils/axios";

export default withPrivate(function UserDetailPage() {
  const { signOut } = useUser();
  return (
    <div>
      <Header />
      <h2>회원 상세페이지</h2>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
});
