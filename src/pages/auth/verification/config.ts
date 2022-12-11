import { IAuthField } from "../../../ts/interfaces/auth";

export const verificationFields: IAuthField[] = [
  {
    fieldName: "verificationCode",
    placeholder: "00000",
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
];
