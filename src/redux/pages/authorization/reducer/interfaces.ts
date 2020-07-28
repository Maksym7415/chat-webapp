import { Login, SignUp, Verification } from '../../../../pages/auth/authorization/interfaces';

export interface AuthReducerInterface {
  login: Login
  signUp: SignUp
  tokenPayload: object
  verification: Verification
}
