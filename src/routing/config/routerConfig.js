import SignInPage from '../../pages/auth/authorization';
import SignUpPage from '../../pages/auth/registration';
import VerificationPage from '../../pages/auth/verification';
import MainScreen from '../../pages/mainScreen';
import UserConversationHistoryPage from '../../pages/mainScreen/components/conversationsPages/UserConversationHistoryPage';
import UserProfile from '../../pages/user/components/userProfile';
import { Paths } from './paths';

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
    Component: MainScreen,
    path: Paths.main,
    roles: [
      'admin',
      'user',
      'superadmin',
    ],
    isPrivate: true,

  },
  {
    id: 5,
    Component: SignUpPage,
    path: Paths.profile,
    roles: [
      'admin',
    ],
    isPrivate: true,
  },
  {
    id: 6,
    Component: MainScreen,
    path: `${Paths.chat}/:id`,
    roles: [
      'admin',
      'superadmin',
    ],
    isPrivate: true,
  },
  {
    id: 7,
    Component: UserProfile,
    path: Paths.userProfile,
    roles: [
      'admin',
      'user',
      'superadmin',
    ],
    isPrivate: true,
  },
  {
    id: 8,
    Component: MainScreen,
    path: Paths.newchat,
    roles: [
      'admin',
      'user',
      'superadmin',
    ],
    isPrivate: true,
  },
];
