import { useTheme, Typography, Box } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFriends } from "state";

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const user = useSelector((state) => state.user);
  const [friendsOfUsers, setFriendsOfUsers] = useState([]);
  const { userId } = useParams();

  const getFriends = async () => {
    let response;
    if (user && !userId) {
      response = await fetch(
        `http://localhost:3001/users/${user._id}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    const data = await response.json();
    if (!userId) {
      dispatch(setFriends({ friends: data }));
    } else {
      setFriendsOfUsers(data);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

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
        sx={{ mb: "1.5rem" }}
      >
        {userId ? "Friend List" : "Recent Friends"}
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
