import express from 'express';
const router = express.Router();

//routes
import userRoutes from './user.server.route';
import postRoutes from './post.server.route';
import mediaRoutes from './media.server.route';

new userRoutes(router);
new postRoutes(router);
new mediaRoutes(router);

export default router;
