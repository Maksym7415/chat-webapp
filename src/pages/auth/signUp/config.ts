import { EMAIL_REGEX } from "../../../helpers";
import { IAuthField } from "../../../ts/interfaces/auth";

export const signUpPage: IAuthField[] = [
  {
    fieldName: "firstName",
    placeholder: "John",
    validate: {
      required: "required",
    },
    styles: {
      container: {
        maxWidth: 300,
        marginTop: 16,
      },
    },
  },
  {
    fieldName: "lastName",
    placeholder: "Doe",
    validate: {
      required: "required",
    },
    styles: {
      container: {
        maxWidth: 300,
        marginTop: 16,
      },
    },
  },
  {
    fieldName: "email",
    placeholder: "email@example.com",
    validate: {
      required: "required",
      pattern: {
        value: EMAIL_REGEX,
        message: "not valid",
      },
    },
    styles: {
      container: {
        maxWidth: 300,
        marginTop: 16,
      },
    },
  },
];
