import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import ScrollToTopButton from "./ScrollToTopButton";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        {isAuth && (
          <UserWidget user={user} />
        )}
      </Box>

      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {isAuth && <MyPostWidget />}
        <PostsWidget />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <AdvertWidget />
          <Box m="2rem 0" />
          {isAuth && <FriendListWidget />}
        </Box>
      )}

      <ScrollToTopButton />
    </Box>
  );
};

export default HomePage;
