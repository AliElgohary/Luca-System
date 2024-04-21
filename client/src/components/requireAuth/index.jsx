import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../contexts/AppContext";
import Spinner from "../common/Spinner";

const requireAuth = (Component) => {
  const AuthComponent = ({ ...props }) => {
    const [authenticated, setAuthenicated] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { authUser } = useApp();

    // TODO: change this dirty implementation
    // TODO: instead of waiting 2 seconds you can send a request to validate the access token
    useEffect(() => {
      if (authUser.accessToken) {
        setAuthenicated(true);
      }
      const waitForAccess = setTimeout(() => {
        setLoading(false);
        if (!authUser.accessToken) return navigate("/login");
        setAuthenicated(true);
      }, 2000);

      return () => {
        clearTimeout(waitForAccess);
        setLoading(false);
      };
    }, [authUser.accessToken]);
    console.log("wow");
    return (
      <>
        {authenticated && <Component {...props} {...authUser} />}
        {loading && !authenticated && (
          <div className="h-screen bg-zinc-800 flex justify-center items-center">
            <Spinner size={50} />
          </div>
        )}{" "}
        {/* TODO: show skeleton loading instead */}
      </>
    );
  };
  AuthComponent.displayName = "AuthComponent";

  return AuthComponent;
};

export default requireAuth;
