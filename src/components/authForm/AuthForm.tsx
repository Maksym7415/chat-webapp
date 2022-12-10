import React from "react";
import { Controller } from "react-hook-form";
import useStyles from "./styles";
import TextInputCustom from "../hookFormsComponents/textInput";
import CustomButton from "../buttons/customButton";

// need ts

const AuthForm = ({
  title,
  configFields,
  optionsForm,
  errorBack,
  onSubmit,
  submitBtnTitle,
  render,
}: any) => {
  // HOOKS
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.wrapperForm}>
        {title && <p className={classes.title}>{title}</p>}
        <React.Fragment>
          {configFields.map((el, key) => (
            <Controller
              key={key}
              control={optionsForm.control}
              rules={el.validate}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputCustom
                  onChangeText={onChange}
                  value={value}
                  error={optionsForm.errors[el.fieldName]}
                  keyboardType={el?.keyboardType}
                  placeholder={el.placeholder}
                  secureTextEntry={false}
                  styles={el.styles}
                />
              )}
              name={el.fieldName}
            />
          ))}
        </React.Fragment>
        {errorBack && (
          <div className={classes.error}>
            <p className={classes.errorText}>{errorBack}</p>
          </div>
        )}
        <CustomButton
          onClick={optionsForm.handleSubmit(onSubmit)}
          style={{ marginTop: 15, width: "100%", maxWidth: "200px" }}
        >
          {submitBtnTitle}
        </CustomButton>
        {render?.text && render.text(classes)}
      </div>
    </div>
  );
};

export default AuthForm;
