import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import GoogleMapsWidget from "scenes/widgets/GoogleMapsWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { pathname } = useLocation();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <GoogleMapsWidget user={user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {pathname.includes("friends") ? (
            <FriendListWidget />
          ) : (
            <PostsWidget />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
