import { makeStyles } from "@mui/styles";
import IMAGES from "../../assets/img";

export default makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    backgroundImage: `url(${IMAGES.bgTest})`,
  },
}));
