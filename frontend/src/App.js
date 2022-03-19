import { useRoutes } from "react-router-dom";
import { SignInPage, SignUpPage, UserDetailPage } from "pages";

export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserDetailPage />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);
  return routes;
}
