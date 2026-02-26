import 'dotenv/config';
import { env } from '@/config/env';
import app from '@/app';
import { sequelize } from '@/config/database';

const PORT = env.PORT;

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Sync all models (use { force: true } to reset tables in dev)
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();
