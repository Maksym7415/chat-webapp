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
    roles: [],
    isPrivate: false,
  },
  {
    id: 2,
    Component: SignUpPage,
    path: Paths.signUp,
    roles: [],
    isPrivate: false,
  },
  {
    id: 3,
    Component: VerificationPage,
    path: Paths.verification,
    roles: [],
    isPrivate: false,
  },
  {
    id: 4,
    Component: MainPage,
    path: Paths.main,
    roles: ["admin", "user", "superadmin"],
    isPrivate: true,
  },
  {
    id: 5,
    Component: MainPage,
    path: `${Paths.chat}/:id`,
    roles: ["admin", "user", "superadmin"],
    isPrivate: true,
  },
  {
    id: 6,
    Component: MainPage,
    path: `${Paths.newChat}`,
    roles: ["admin", "user", "superadmin"],
    isPrivate: true,
  },
];
