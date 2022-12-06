import React from "react";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import RenderConditionsList from "../../../../components/renders/renderConditionsList";
import { useAppSelector } from "../../../../hooks/redux";

const SearchProfile = () => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);

  // SELECTORS
  const { searchSettingsQuestions, isLoading } = useAppSelector(
    ({ searchSlice }) => searchSlice
  );

  // RENDER CONDITIONAL
  if (!searchSettingsQuestions?.response.length || isLoading) {
    return (
      <RenderConditionsList
        list={searchSettingsQuestions?.response}
        isLoading={isLoading}
        noResultsText="No get request"
      />
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={classes.container}></ScrollView>
    </>
  );
};

export default SearchProfile;
