import { useTheme } from "@emotion/react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Typography, IconButton, Box, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const likeCount = Object.keys(post.likes || {}).length;
  const { postId } = useParams();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`);
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  const patchLike = async () => {
    if (!isAuth) {
      return navigate("/login");
    }

    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const updatedPost = await response.json();
    setPost(updatedPost);
    // dispatch(setPost({ post: updatedPost }));
  };

  if (!post._id) {
    return null;
  }

  return (
    <WidgetWrapper maxWidth="500px" margin="2rem auto">
      <Friend
        friendId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          src={`http://localhost:3001/assets/${post.picturePath}`}
          alt="post"
          width="100%"
          height="auto"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isAuth && Boolean(post.likes[user._id]) ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Box mt="0.5rem">
        {post.comments?.map((comment, i) => (
          <Box key={i}>
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              {comment}
            </Typography>
          </Box>
        ))}
        <Divider />
      </Box>
    </WidgetWrapper>
  );
};

export default DetailsPage;
