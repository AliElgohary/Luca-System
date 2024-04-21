import { useEffect } from "react";
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");

    window.location = "/";
  }, []);
  return null;
};

export default Logout;
