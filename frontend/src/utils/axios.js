import axios from "axios";

const instance1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const instance2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

instance1.interceptors.request.use(
  async (config) => {
    const tokensStringObj = window.localStorage.getItem("tokens");
    if (!tokensStringObj) {
      console.debug("[Localstage에 토큰정보 없음 -> 요청 취소]");
    }

    const tokens = JSON.parse(tokensStringObj);
    const { act, actExp, rft } = tokens;
    config.headers["Authorization"] = `Bearer ${act}`;

    const msActExp = Number(String(actExp) + "000");
    const limitExp = new Date().getTime();
    console.debug(msActExp);
    console.debug(limitExp);

    if (msActExp < limitExp && rft) {
      console.debug(
        "[만료시간 초과 및 리프레시 토큰 보유 확인 -> 토큰 자동연장요청]"
      );
      const { data } = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/users/refresh",
        headers: {
          Authorization: `Bearer ${rft}`,
        },
      }).catch((err) => {
        const errData = err.response.data;
        console.debug(errData);
        throw new Error(errData?.message);
      });
      const tokens = JSON.stringify(data);
      window.localStorage.setItem("tokens", tokens);
      config.headers["Authorization"] = `Bearer ${data.act}`;
    }
    return config;
  },
  (err) => {
    console.debug("axios interceptor request error");
    console.debug(err);
  }
);

instance1.interceptors.response.use(
  (response) => {
    console.debug("성공적인 응답이 왔어요. 🐹");
    console.debug(response.data);
    return response;
  },
  (err) => {
    console.debug("axios interceptor response error");
    const errData = err?.response?.data;
    throw new Error(errData?.message);
  }
);
instance2.interceptors.response.use(
  (response) => {
    console.debug("성공적인 응답이 왔어요. 🐹");
    console.debug(response.data);
    return response;
  },
  (err) => {
    console.debug("axios interceptor response error");
    const errData = err?.response?.data;
    throw new Error(errData?.message);
  }
);

export const customAxios = instance1;
export const customAxiosWithoutRI = instance2;
