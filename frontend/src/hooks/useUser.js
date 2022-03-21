import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { customAxios, customAxiosWithoutRI } from "utils/axios";

const credentialsUserState = atom({
  key: "credentialsUserState",
  default: null,
});

export const useAuthEffect = () => {
  const [credentialsUser, setCredentialsUser] =
    useRecoilState(credentialsUserState);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(async () => {
    console.debug("회원 로그인 이펙트 실행");
    const { data } = await customAxios({
      method: "get",
      url: "/users/me",
    }).catch(() => {
      setCredentialsUser(null);
      setIsCompleted(true);
      throw new Error("유저 데이터 없음.");
    });

    setCredentialsUser(data);
    setIsCompleted(true);
  }, []);

  return {
    credentialsUser,
    isCompleted,
  };
};

export default function useUser() {
  const [credentialsUser, setCredentialsUser] =
    useRecoilState(credentialsUserState);
  const navigate = useNavigate();

  const getCredentialsUser = async () => {
    const { data } = await customAxios({
      method: "get",
      url: "/users/me",
    });
    setCredentialsUser(data);
  };

  const signUp = async (form) => {
    const res = await customAxiosWithoutRI({
      method: "post",
      url: "/users",
      data: form,
    });
    console.debug(res.data);
    window.alert("회원가입이 완료되었습니다! 🐥");
    navigate("/login");
  };

  const signIn = async (form) => {
    const { data } = await customAxiosWithoutRI({
      method: "post",
      url: "/users/login",
      data: form,
    });
    const tokens = JSON.stringify(data);
    window.localStorage.setItem("tokens", tokens);

    await getCredentialsUser();
    window.alert("로그인 성공! 🐥");
  };

  const signOut = () => {
    window.alert("성공적으로 로그아웃하였습니다.");
    window.localStorage.removeItem("tokens");

    setCredentialsUser(null);
  };

  return {
    credentialsUser,
    signUp,
    signIn,
    signOut,
  };
}
