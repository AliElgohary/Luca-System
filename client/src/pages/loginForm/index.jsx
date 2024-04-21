import styles from "./LoginForm.module.css";
import { useEffect, useRef } from "react";

import useLocale from "../../contexts/LocaleContext";
import { useAsyncFn } from "../../hooks/useAsync";
import { apiLogin } from "../../services/userServices";
import { toast } from "react-toastify";
import useApp from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { t } = useLocale();
  const { storeAccessToken } = useApp();
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const { error, execute, value } = useAsyncFn(apiLogin);

  const handleLoginSuccess = async () => {
    // we get access token
    const accessToken = value.accessToken;
    await storeAccessToken(accessToken);
    //redirect to the homepage
    navigate("/dashboard");
  };
  const handleLoginFailure = () => {
    const msg =
      error?.data?.error || error?.data?.msg || "something went wrong";

    console.log(error);
    toast.error(msg);
  };
  useEffect(() => {
    if (value) handleLoginSuccess();
    if (error) handleLoginFailure();
  }, [value, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add validation for username and password
    execute(username.current.value, password.current.value);
  };
  return (
    <div className={styles.container}>
      <form className="max-w-sm w-full mx-auto shadow-2xl bg-zinc-900 py-10 px-8 rounded-lg">
        <h2 className="text-4xl dark:text-white font-bold text-center">
          {t("signIn.title")}
        </h2>
        <div>
          <label className="flex flex-col text-gray-300 py-2">
            {t("signIn.username")}
          </label>
          <input
            ref={username}
            className="p-2 rounded-lg bg-zinc-700 mt-2 focus:bg-zinc-800 focus:outline-none w-full text-white"
            type="text"
          />
        </div>
        <div>
          <label className="flex flex-col text-gray-300 py-2">
            {t("signIn.password")}
          </label>
          <input
            ref={password}
            className="p-2 rounded-lg bg-zinc-700 mt-2 focus:bg-zinc-800 focus:outline-none w-full text-white"
            type="password"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full my-5 py-5 bg-zinc-800 shadow-lg text-white font-semibold rounded-2xl duration-500"
        >
          {t("signIn.title")}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
