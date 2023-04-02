import { useTheme } from '@emotion/react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Edit,
  Delete,
  AddComment,
} from '@mui/icons-material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import {
  Typography,
  IconButton,
  Box,
  Divider,
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  InputBase,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { patch } from 'services/requester';
import { likePost } from 'services/postService';

const DetailsPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const likeCount = Object.keys(post.likes || {}).length;
  const { postId } = useParams();
  const isOwner = isAuth && user._id === post.userId;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [comment, setComment] = useState('');

  const theme = useTheme();
  const main = theme.palette.neutral.main;
  const primary = theme.palette.primary.main;

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    };

    getPost();
  }, [postId]);

  const patchLike = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    const updatedPost = await likePost(postId, { userId: user._id });
    setPost(updatedPost);
  };

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const deletePostHandler = async () => {
    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    closeDeleteDialog();
    navigate('/');
  };

  const addCommentHandler = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: `${user.firstName} ${user.lastName}`,
          comment,
        }),
      }
    );
    const updatedPost = await response.json();
    setPost(updatedPost);
    setComment('');
  };

  if (!post._id) {
    return null;
  }

  return (
    <WidgetWrapper maxWidth="500px" margin="2rem auto">
      <Dialog
        open={isDeleteDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogActions>
          <Button onClick={deletePostHandler}>Yes</Button>
          <Button onClick={closeDeleteDialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      {isOwner && (
        <Grid
          container
          sx={{
            border: `2px dashed ${main}`,
            borderRadius: '5px',
            padding: '4px 8px',
            marginBottom: '1rem',
          }}
        >
          <Grid item xs={10}>
            <Typography mt="0.5rem">Author menu</Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Edit">
              <IconButton onClick={() => navigate(`/posts/${postId}/edit`)}>
                <Edit sx={{ color: primary }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
      <Friend
        friendId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.occupation}
        userPicturePath={post.userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          src={`http://localhost:3001/assets/${post.picturePath}`}
          alt="post"
          width="100%"
          height="auto"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
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
        <FlexBetween
          backgroundColor={theme.palette.neutral.light}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Add comment..."
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton onClick={addCommentHandler} disabled={!comment}>
            <AddComment />
          </IconButton>
        </FlexBetween>

        {post.comments?.map((comment, i) => (
          <Box key={i}>
            {i > 0 ? <Divider /> : null}
            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
              {comment.fullName}: {comment.comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default DetailsPage;
