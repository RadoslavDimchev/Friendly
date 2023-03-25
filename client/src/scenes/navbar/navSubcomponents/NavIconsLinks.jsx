import { Help, Message, Notifications } from "@mui/icons-material";
import { useSelector } from "react-redux";

const NavIconsLinks = () => {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    isAuth && (
      <>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
      </>
    )
  );
};

export default NavIconsLinks;
