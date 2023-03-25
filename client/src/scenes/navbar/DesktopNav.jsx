import { Help, Message, Notifications } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import LightDarkMode from "./LightDarkMode";
import SelectMenu from "./SelectMenu";

const DesktopNav = () => {
  return (
    <FlexBetween gap="2rem">
      <LightDarkMode />
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <SelectMenu />
    </FlexBetween>
  );
};

export default DesktopNav;
