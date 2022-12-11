import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as config from "./config";
import AuthForm from "../../../components/authForm";
import { Paths } from "../../../routing/config/paths";
import languages from "../../../config/translations";
import { postSingUpRequest } from "../../../reduxToolkit/auth/requests";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

// need ts
interface IInputs {
  firstName: string;
  lastName: string;
  email: string;
}

const SignUpPage = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const history = useHistory();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [errorBack, setErrorBack] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // FUNCTIONS
  const onSubmit = (data: IInputs) => {
    dispatch(
      postSingUpRequest({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          login: data.email,
        },
        cb: () => {
          history.push(Paths.verification);
        },
        errorCb: (dataError) => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      })
    );

    errorBack && setErrorBack("");
  };

  return (
    <AuthForm
      title={languages[lang].authorization.signUp}
      submitBtnTitle={languages[lang].authorization.signUp}
      configFields={config.signUpPage}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
      render={{
        text: (styles: { text: string }) => (
          <p className={styles.text} onClick={() => history.push(Paths.signIn)}>
            {languages[lang].authorization.haveAnAccount}{" "}
            {languages[lang].authorization.signIn}?
          </p>
        ),
      }}
    />
  );
};

export default SignUpPage;
