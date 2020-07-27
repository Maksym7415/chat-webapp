import SignInPage from '../../pages/auth/authorization/login';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';

export default [
  {
    id: 1,
    component: SignInPage,
    path: '/signin',
    security: false,
  },
  {
    id: 2,
    component: SignUpPage,
    path: '/signup',
    security: false,
  },
  {
    id: 3,
    component: VerificationPage,
    path: '/verification',
    security: false,
  },
  {
    id: 4,
    component: MainScreen,
    path: '/',
    security: true,
  },

];
