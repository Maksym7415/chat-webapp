import SignInPage from '../../pages/auth/authorization/login';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';
import AppBarWrapper from '../../components/appBar/AppBarWrapper';

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
    Component: AppBarWrapper,
    roles: {
      '/': [
        'admin',
        'user',
      ],
      '/profile': [
        'admin',
        'txl',
      ],
    },
    childrens: [
      {
        id: 5,
        component: MainScreen,
        path: '/',

      },
      {
        id: 6,
        component: SignUpPage,
        path: '/profile',

      },
    ],
    security: true,
  },

];
