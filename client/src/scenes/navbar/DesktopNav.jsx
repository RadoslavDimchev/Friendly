import FlexBetween from "components/FlexBetween";
import LightDarkMode from "./LightDarkMode";
import NavIconsLinks from "./NavIconsLinks";
import SelectMenu from "./SelectMenu";

const DesktopNav = () => {
  return (
    <FlexBetween gap="2rem">
      <LightDarkMode />
      <NavIconsLinks />
      <SelectMenu />
    </FlexBetween>
  );
};

export default DesktopNav;
