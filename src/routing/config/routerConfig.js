import SignInPage from "../../pages/auth/signIn";
import SignUpPage from "../../pages/auth/signUp";
import VerificationPage from "../../pages/auth/verification";
import MainPage from "../../pages/main";

import { Paths } from "./paths";

export default [
  {
    id: 1,
    Component: SignInPage,
    path: Paths.signIn,
    isPrivate: false,
  },
  {
    id: 2,
    Component: SignUpPage,
    path: Paths.signUp,
    isPrivate: false,
  },
  {
    id: 3,
    Component: VerificationPage,
    path: Paths.verification,
    isPrivate: false,
  },
  {
    id: 4,
    Component: MainPage,
    path: Paths.main,
    isPrivate: true,
  },
  {
    id: 5,
    Component: MainPage,
    path: `${Paths.chat}/:id`,
    isPrivate: true,
  },
  {
    id: 6,
    Component: MainPage,
    path: `${Paths.newChat}`,
    isPrivate: true,
  },
];
