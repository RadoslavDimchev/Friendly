import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import * as postService from 'services/postService';

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const queryString = new URLSearchParams(location.search);
  const [sortedBy, setSortedBy] = useState('');

  useEffect(() => {
    setSortedBy(queryString.get('sort') || 'recent');

    const getPosts = async () => {
      try {
        const posts = await postService.getAll(
          params.userId,
          queryString.has('sort') ? 'likes' : ''
        );
        dispatch(setPosts({ posts }));
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, [params.userId, sortedBy, location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeSortHandler = (e) => {
    if (e.target.value === 'likes') {
      queryString.set('sort', 'likes');
      navigate({ search: queryString.toString() });
    } else {
      queryString.delete('sort');
      navigate({ search: queryString.toString() });
    }
    setSortedBy(e.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: '0.5rem' }}
      >
        <Divider sx={{ width: '80%' }} />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sortedBy}
            onChange={changeSortHandler}
          >
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="likes">Likes</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {posts.length === 0 ? (
        <Typography>Looks like there are no posts here yet!</Typography>
      ) : (
        posts.map((post) => (
          <PostWidget
            key={post._id}
            postId={post._id}
            postUserId={post.userId}
            name={`${post.firstName} ${post.lastName}`}
            description={post.description}
            picturePath={post.picturePath}
            userPicturePath={post.userPicturePath}
            likes={post.likes}
            comments={post.comments}
            occupation={post.occupation}
          />
        ))
      )}
    </>
  );
};

export default PostsWidget;
