import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    headerTop: {
      alignItems: "center",
    },
    wrapper: {
      alignItems: "center",
      padding: "0 20px",
    },
  });
