import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

// Mount feature routes here, e.g.:
// import userRoutes from './users';
// router.use('/users', userRoutes);

router.get('/', (_req, res) => {
  res.json({ message: 'API is running' });
});

export default router;
