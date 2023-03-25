import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="5rem"
      justifyContent="end"
    >
      {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={_id} picturePath={picturePath} />
      </Box> */}
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {isAuth && <MyPostWidget picturePath={picturePath} />}
        <PostsWidget userId={_id} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <AdvertWidget />
          {/* <Box m="2rem 0" /> */}
          {/* <FriendListWidget userId={_id} /> */}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
