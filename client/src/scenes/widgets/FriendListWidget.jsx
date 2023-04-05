import { useTheme, Typography, Box } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setFriends } from 'state';
import * as userService from 'services/userService';
import { useIsAuth } from 'hooks/useIsAuth';

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isAuth = useIsAuth();
  const user = useSelector((state) => state.user);
  const [friendsOfUsers, setFriendsOfUsers] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await userService.getAllUserFriends(
          isAuth && !userId ? user._id : userId
        );
        if (isAuth && !userId) {
          dispatch(setFriends({ friends }));
        } else {
          setFriendsOfUsers(friends);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isUserAtHomePage = !userId && isAuth;
  const friendsToMap = isAuth
    ? user._id === userId
      ? user.friends
      : user.friends.slice(-3).reverse()
    : friendsOfUsers;

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={palette.neutral.dark}
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        {isUserAtHomePage ? 'Recent Friends - ' : 'Friend List'}
        {isUserAtHomePage && (
          <Link
            style={{
              fontSize: '14px',
              textDecoration: 'none',
              color: palette.neutral.medium,
            }}
            to={`profile/${user._id}/friends`}
          >
            view all
          </Link>
        )}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friendsToMap.length > 0 ? (
          friendsToMap.map(
            (friend) =>
              friend._id && (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              )
          )
        ) : (
          <Typography>Looks like there are no friends here yet!</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
