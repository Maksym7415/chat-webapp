import SignInPage from '../../pages/auth/authorization';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';
import PrivatePage from '../../components/appBar/AppBarWrapper';
import PublicPage from '../../pages/publicPage';

export default [
  {
    id: 1,
    childrenPath: [
      '/signIn',
      '/signUp',
      '/verification',
    ],
    Component: PublicPage,
    childrens: [
      {
        id: 2,
        component: SignInPage,
        path: '/signIn',

      },
      {
        id: 3,
        component: SignUpPage,
        path: '/signUp',

      },
      {
        id: 4,
        component: VerificationPage,
        path: '/verification',

      },
    ],
    security: false,
  },
  {
    id: 5,
    childrenPath: [
      '/',
      '/profile',
    ],
    Component: PrivatePage,
    childrens: [
      {
        id: 6,
        component: MainScreen,
        path: '/',
        roles: [
          'admin',
          'user',
        ],
      },
      {
        id: 7,
        component: SignUpPage,
        path: '/profile',
        roles: [
          'admin',
          'superadmin',
        ],
      },
    ],
    security: true,
  },

];
