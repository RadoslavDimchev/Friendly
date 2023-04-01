import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { pathname } = useLocation();
  const params = useParams();

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts');
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${params.userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (pathname === '/') {
      getPosts();
    } else {
      getUserPosts();
    }
  }, [params.userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{mb: '0.5rem'}}
      >
        <Divider sx={{ width: '80%' }} />
        <FormControl variant="standard"  >
          <InputLabel id="demo-simple-select-standard-label">
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={12}
            onChange={(e) => console.log(e)}
          >
            <MenuItem value={12}>Recent</MenuItem>
            <MenuItem value={20}>Likes</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
          occupation,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            occupation={occupation}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
