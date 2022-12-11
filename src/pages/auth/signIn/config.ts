import { IAuthField } from "../../../ts/interfaces/auth";

export const signInFields: IAuthField[] = [
  {
    fieldName: "login",
    placeholder: "email@example.com",
    validate: {
      required: "required",
    },
    styles: {
      container: {
        marginTop: 16,
      },
    },
  },
];
