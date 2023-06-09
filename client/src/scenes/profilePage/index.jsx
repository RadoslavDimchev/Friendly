import { Box, useMediaQuery } from '@mui/material';
import Loading from 'components/Loading';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import GoogleMapsWidget from 'scenes/widgets/GoogleMapsWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';
import * as userService from 'services/userService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getById(userId);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? 'flex' : 'block'}
      gap="2rem"
      justifyContent="center"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget user={user} />
            <GoogleMapsWidget user={user} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? '42%' : undefined}
            mt={isNonMobileScreens ? undefined : '2rem'}
          >
            {pathname.includes('friends') ? (
              <FriendListWidget />
            ) : (
              <PostsWidget />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
