import { Navigate } from "react-router-dom";

export default function withPrivate(Component) {
  return ({ user = null, redirectURL = "/login" }) => {
    if (!user) {
      return <Navigate to={redirectURL} />;
    }
    return <Component />;
  };
}
