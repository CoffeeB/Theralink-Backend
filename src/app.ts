import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (_req, res) => {
    res.json({ status: 'API is running' });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app };
