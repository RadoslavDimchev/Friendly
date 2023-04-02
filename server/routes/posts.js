import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getFeedPosts,
  likePost,
  getPost,
  deletePost,
  addCommentonPost
} from '../controllers/posts.js';

const router = express.Router();

// READ
router.get('/', getFeedPosts);
router.get('/:userId/posts', getFeedPosts);
router.get('/:postId', getPost);

// UPDATE
router.patch('/:postId/like', verifyToken, likePost);
router.patch('/:postId/comments', verifyToken, addCommentonPost);

// DELETE 
router.delete('/:postId', verifyToken, deletePost);

export default router;