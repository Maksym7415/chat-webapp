/* eslint-disable no-return-assign */
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Paths } from "../../../../routing/config/paths";
import languages from "../../../../config/translations";

export const drawerList = [
  {
    id: 1,
    title: "Profile",
    route: Paths.main,
    // roles: ["admin", "user"],
    icon: <PersonIcon />,
    value: "myProfile",
  },
  {
    id: 2,
    title: "New Chat",
    route: Paths.main,
    // roles: ["admin", "user"],
    icon: <GroupIcon />,
    value: "newChat",
  },
  {
    id: 3,
    title: "Logout",
    route: Paths.signIn,
    // roles: ["admin", "user"],
    icon: <ExitToAppIcon />,
    value: "logout",
  },
];
