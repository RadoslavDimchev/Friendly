import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';

const router = express.Router();

// READ
router.get('/:id', getUser);
router.get('/:id/friends', getUserFriends);

// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;