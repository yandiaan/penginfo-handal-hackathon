import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';
import router from '@/routes';
import nodeRoutes from '@/routes/nodeRoutes';
import uploadRoutes from '@/routes/uploadRoutes';
import pipelineRoutes from '@/routes/pipelineRoutes';
import { errorHandler } from '@/middleware/errorHandler';

const app: Application = express();

// Security & utility middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads directory
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// Routes
app.use('/api', router);
app.use('/api/node', nodeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/pipeline', pipelineRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
