import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as config from "./config";
import AuthForm from "../../../components/authForm";
import { Paths } from "../../../routing/config/paths";
import languages from "../../../config/translations";
import { postLoginRequest } from "../../../reduxToolkit/auth/requests";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const SignIn = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const history = useHistory();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const loginSingIn = useAppSelector(({ authSlice }) => authSlice.loginSingIn);

  // STATES
  const [errorBack, setErrorBack] = React.useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: loginSingIn || "",
    },
  });

  // FUNCTIONS
  const onSubmit = (data: { login: string }) => {
    const { login } = data;

    dispatch(
      postLoginRequest({
        data: {
          login,
        },
        cb: () => {
          history.push(Paths.verification);
        },
        errorCb: (dataError: any) => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      })
    );

    errorBack && setErrorBack("");
  };

  return (
    <AuthForm
      title={languages[lang].authorization.signIn}
      submitBtnTitle={languages[lang].authorization.signIn}
      configFields={config.signInFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
      render={{
        text: (styles: { text: string }) => (
          <p className={styles.text} onClick={() => history.push(Paths.signUp)}>
            {languages[lang].authorization.haveNoAccount}{" "}
            {languages[lang].authorization.signUp} ?
          </p>
        ),
      }}
    />
  );
};

export default SignIn;
