import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';
import appointmentRoutes from './routes/appointment.routes';
import insuranceRoutes from './routes/insurance.routes';
import medicalHistoryRoutes from './routes/medicalHistory.routes';

const app = express();

// Middleware
//app.use(cors());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/medicalHistory', medicalHistoryRoutes);
// Health check route
app.get('/', (_req, res) => {
    res.json({ status: 'API is running' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app };
