import SignInPage from '../../pages/auth/authorization/login';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';
import UserConversationHistoryPage from '../../pages/mainScreen/conversationsPages/UserConversationHistoryPage.tsx';

import PrivatePage from '../../components/appBar/AppBarWrapper';
import PublicPage from '../../pages/publicPage';

export default [
  {
    id: 1,
    childrenPath: [
      '/signIn',
      '/signUp',
      '/verification',
      '/',
    ],
    Wrapper: PublicPage,
    children: [
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
    Wrapper: PrivatePage,
    childrenPath: [
      '/',
      '/profile',
      // '/chat',
    ],
    children: [
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
      // {
      //   id: 8,
      //   component: UserConversationHistoryPage,
      //   path: '/chat/:id',
      //   roles: [
      //     'admin',
      //   ],
      // },
    ],
    security: true,
  },
];
