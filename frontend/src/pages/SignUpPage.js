import { Header } from "containers";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { withPublic } from "HOC";
import { useUser } from "hooks";

export default withPublic(function SignUpPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signUp } = useUser();

  return (
    <div>
      <Header />
      <h2>회원가입 페이지</h2>
      <form onSubmit={handleSubmit(signUp)} className="w-[50%]">
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
          <span className="text-xs">이름</span>
          <input
            {...register("name", {
              required: "이름은 필수값입니다.",
              pattern: {
                value: /^[가-힣]{2,4}$/,
                message: "한글이름으로 2~4자만 입력 가능합니다.",
              },
            })}
            className="border"
          />
          <span className="text-xs text-red-500">{errors.name?.message}</span>
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
        <button>가입</button>
      </form>
    </div>
  );
});
