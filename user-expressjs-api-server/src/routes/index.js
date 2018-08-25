import express from 'express';
const router = express.Router();

//routes
import userRoutes from './user.server.route';
import postRoutes from './post.server.route';

new userRoutes(router);
new postRoutes(router);

export default router;
