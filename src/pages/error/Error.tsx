import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Redirect } from "react-router-dom";
import NotFound from "./components/notFound";
import { Paths } from "../../routing/config/paths";
import { useAppSelector } from "../../hooks/redux";
import { ILocationParams } from "../../ts/interfaces/app";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
}));

interface IProps {
  content?: string;
}

const ErrorPage = ({ content }: IProps) => {
  // HOOKS
  const classes = useStyles();
  const location = useLocation<ILocationParams<any>>();

  // SELECTORS
  const token = useAppSelector(
    ({ authSlice }) => authSlice.headers.accessToken
  );

  // VARIABLES
  const renderContent = content || location.state?.content || "";

  if (renderContent === "") {
    return token ? (
      <Redirect to={Paths.main} />
    ) : (
      <Redirect to={Paths.signIn} />
    );
  }

  return (
    <div className={classes.container}>
      {(() => {
        switch (renderContent) {
          case "notFound":
            return <NotFound />;
          default:
            return <>error</>;
        }
      })()}
    </div>
  );
};

export default ErrorPage;
