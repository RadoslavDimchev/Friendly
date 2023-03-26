import { useTheme } from "@emotion/react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  IconButton,
  Box,
  Divider,
  Stack,
  Grid,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
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
  const isOwner = isAuth && user._id === post.userId;

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
  };

  const deletePostHandler = async () => {
    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/");
  };

  if (!post._id) {
    return null;
  }

  return (
    <WidgetWrapper maxWidth="500px" margin="2rem auto">
      {isOwner && (
        <Grid
          container
          sx={{
            border: `2px dashed ${main}`,
            borderRadius: "5px",
            padding: "4px 8px",
            marginBottom: "1rem",
          }}
        >
          <Grid item xs={10}>
            <Typography mt="0.5rem">Author menu</Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Edit">
              <IconButton>
                <Edit sx={{ color: primary }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton onClick={deletePostHandler}>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
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
