import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getPost,
  deletePost,
  editPost
} from '../controllers/posts.js';

const router = express.Router();

// READ
router.get('/', getFeedPosts);
router.get('/:userId/posts', getUserPosts);
router.get('/:postId', getPost);

// UPDATE
router.patch('/:postId/like', verifyToken, likePost);

// DELETE 
router.delete('/:postId', verifyToken, deletePost);

export default router;