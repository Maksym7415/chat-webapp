import React from "react";
import { TextField } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import useStyles from "./styles";

const propTypes = {
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

const TextInputField = ({
  onChangeText,
  error,
  secureTextEntry,
  label,
  keyboardType,
  value,
  styles,
  placeholder,
  settingAuto = {
    autoCapitalize: "auto",
    autoComplete: false,
    autoCorrect: false,
  },
  textInputProps = {},
}) => {
  // HOOKS
  const classes = useStyles();

  return (
    <div className={classes.container} style={styles.container}>
      {label && <p style={styles.label}>{label}</p>}
      <TextField
        className={clsx(classes.inputStyle, {
          [classes.errorInputStyle]: error,
        })}
        onChange={onChangeText}
        value={value}
        placeholder={placeholder}
        {...textInputProps}
        // autoCapitalize={settingAuto.autoCapitalize || 'none'}
        // autoComplete={settingAuto.autoComplete || false}
        // autoCorrect={settingAuto.autoCorrect || false}
      />
      {error && <p className={classes.errorLabel}>{error.message}</p>}
    </div>
  );
};

TextInputField.propTypes = propTypes;

export default TextInputField;
