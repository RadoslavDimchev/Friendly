import {
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, Button } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    getUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  const { firstName, lastName, occupation, viewedProfile, impressions } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            <Link
              to={`/profile/${userId}/friends`}
              style={{
                textDecoration: 'none',
                color: palette.primary.main,
              }}
            >
              View friends
            </Link>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            {user.linkedin ? (
              <Link to={user.linkedin} target="_blank">
                <img
                  src="/assets/linkedin.png"
                  alt="linkedin"
                  width="50px"
                  height="50px"
                />
              </Link>
            ) : (
              <img
                src="/assets/linkedin.png"
                alt="linkedin"
                width="50px"
                height="50px"
              />
            )}
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={main}>Network Platform</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
