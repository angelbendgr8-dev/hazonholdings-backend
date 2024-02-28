import { useAuth } from "alethian-app/state/hooks/user.hook";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

const ProtectedRoute = (WrappedComponent: any) => {
  return function Auth(props: any) {
    const Router = useRouter();
    const { token } = useAuth();
    const dispatch = useDispatch();

    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (!token) {
        Router.push(`/login`);
      } else if (token) {
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default ProtectedRoute;
