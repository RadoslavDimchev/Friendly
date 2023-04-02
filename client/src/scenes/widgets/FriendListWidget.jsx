import { useTheme, Typography, Box } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFriends } from 'state';
import * as userService from 'services/userService';

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const user = useSelector((state) => state.user);
  const [friendsOfUsers, setFriendsOfUsers] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const getFriends = async () => {
      const friends = await userService.getAllUserFriends(
        user && !userId ? user._id : userId
      );
      if (!userId) {
        dispatch(setFriends({ friends }));
      } else {
        setFriendsOfUsers(friends);
      }
    };

    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let friends = [];
  if (!userId || (isAuth && user._id === userId)) {
    friends = user.friends;
  } else {
    friends = friendsOfUsers;
  }

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={palette.neutral.dark}
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        {userId ? 'Friend List' : 'Recent Friends'}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
