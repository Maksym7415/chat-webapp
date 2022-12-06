import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import * as config from "./config";
import AuthForm from "../../../components/authForm";
import languages from "../../../config/translations";
import { postVerificationRequest } from "../../../reduxToolkit/auth/requests";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Paths } from "../../../routing/config/paths";

export default function VerificationPage() {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const { loginSingIn, verificationCode } = useAppSelector(
    ({ authSlice }) => authSlice
  );

  // STATES
  const [errorBack, setErrorBack] = React.useState("");
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      verificationCode: "",
    },
  });

  // FUNCTIONS
  const onSubmit = (data: any) => {
    dispatch(
      postVerificationRequest({
        data: {
          verificationCode: data.verificationCode,
          login: loginSingIn,
        },
        errorCb: (dataError) => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      })
    );
    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  useEffect(() => {
    // set defaultValues form from back
    if (verificationCode) {
      setValue("verificationCode", `${verificationCode}`);
    }
  }, [verificationCode]);

  if (!loginSingIn) {
    return <Redirect to={Paths.signIn} />;
  }

  return (
    <AuthForm
      title={languages[lang].authorization.verificate}
      submitBtnTitle={languages[lang].authorization.verificate}
      configFields={config.verificationFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
    />
  );
}
