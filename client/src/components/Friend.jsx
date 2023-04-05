import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, useTheme, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import * as userService from 'services/userService';
import { useIsAuth } from 'hooks/useIsAuth';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useIsAuth();
  const user = useSelector((state) => state.user);
  const isOwner = isAuth && user._id === friendId;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = isAuth
    ? user.friends.find((friend) => friend._id === friendId)
    : false;

  const patchFriend = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const data = await userService.patchFriend(user._id, friendId);
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isOwner && (
        <IconButton
          onClick={patchFriend}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
