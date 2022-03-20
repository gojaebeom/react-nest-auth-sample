import { useRoutes } from "react-router-dom";
import { SignInPage, SignUpPage, UserDetailPage } from "pages";
import { useAuthEffect } from "hooks";

export default function App() {
  const { credentialsUser, isCompleted } = useAuthEffect();

  const routes = useRoutes([
    {
      path: "/",
      element: <UserDetailPage user={credentialsUser} redirectURL="/login" />,
    },
    {
      path: "/login",
      element: (
        <SignInPage user={credentialsUser} redirectURL="/" restricted={true} />
      ),
    },
    {
      path: "/signup",
      element: (
        <SignUpPage user={credentialsUser} redirectURL="/" restricted={true} />
      ),
    },
  ]);
  if (!isCompleted) return <div>로딩중...</div>;
  return routes;
}
