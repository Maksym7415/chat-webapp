import SignInPage from '../../pages/auth/authorization/login';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';
import PrivatePage from '../../components/appBar/AppBarWrapper';
import PublicPage from '../../pages/publicPage';

export default [
  {
    id: 1,
    roles: {
      '/signin': null,
      '/signup': null,
      '/verification': null,
    },
    Component: PublicPage,
    childrens: [
      {
        id: 2,
        component: SignInPage,
        path: '/signin',

      },
      {
        id: 3,
        component: SignUpPage,
        path: '/signup',

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
    Component: PrivatePage,
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
        id: 6,
        component: MainScreen,
        path: '/',

      },
      {
        id: 7,
        component: SignUpPage,
        path: '/profile',

      },
    ],
    security: true,
  },

];
