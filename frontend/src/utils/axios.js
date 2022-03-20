import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const tokensStringObj = window.localStorage.getItem("tokens");
  console.debug(tokensStringObj);
  if (tokensStringObj) {
    const tokens = JSON.parse(tokensStringObj);
    const { act, actExp, rft } = tokens;
    config.headers["Authorization"] = `Bearer ${act}`;

    const msActExp = Number(String(actExp) + "000");
    const limitExp = new Date().getTime();
    console.debug(msActExp);
    console.debug(limitExp);

    if (msActExp < limitExp && rft) {
      console.debug(
        "만료시간 초과 및 리프레시 토큰 보유 확인 -> 토큰 자동연장요청"
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
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.debug("성공적인 응답이 왔어요. 🐹");
    console.debug(response.data);

    return response;
  },
  (err) => {
    const errData = err?.response?.data;
    console.debug(errData?.message);
    throw new Error(errData?.message);
  }
);

export const customAxios = instance;
