import axios from "axios";
import { Header } from "containers";
import { withPublic } from "HOC";
import { useUser } from "hooks";
import { useForm } from "react-hook-form";

export default withPublic(function SignInPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signIn } = useUser();

  return (
    <div>
      <Header />
      <h2>로그인페이지</h2>
      <form onSubmit={handleSubmit(signIn)} className="w-[50%]">
        <label className="flex flex-col">
          <span className="text-xs">이메일</span>
          <input
            {...register("email", {
              required: "이메일은 필수값입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식이 아닙니다.",
              },
            })}
            className="border"
          />
          <span className="text-xs text-red-500">{errors.email?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-xs">비밀번호</span>
          <input
            {...register("password", {
              required: "비밀번호는 필수값입니다.",
              pattern: {
                value:
                  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message: "특수문자 / 문자 / 숫자 포함 형태의 8~15자리",
              },
            })}
            type="password"
            className="border"
          />
          <span className="text-xs text-red-500">
            {errors.password?.message}
          </span>
        </label>
        <button>로그인</button>
      </form>
    </div>
  );
});
