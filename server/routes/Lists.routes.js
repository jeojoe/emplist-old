import { Router } from 'express';
import * as ListsController from '../controllers/Lists.controller';
const router = new Router();

// Get all Posts
router.route('/lists').get(ListsController.getAllLists);

// Get one post by cuid
// router.route('/lists/:cuid').get(ListsController.getList);

// Add a new List
router.route('/lists').post(ListsController.insertList);

// Delete a post by cuid
// router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;