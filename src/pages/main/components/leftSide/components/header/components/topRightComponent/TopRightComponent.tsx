import React from "react";
// import { useParams } from "react-router-dom";
import useStyles from "./styles";
import { useAppDispatch } from "../../../../../../../../hooks/redux";

// interface ParamsId {
//   id: string;
// }

function TopRightComponent({ data, usersTyping }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  // const params = useParams<any>();

  return <></>;
}

export default TopRightComponent;
