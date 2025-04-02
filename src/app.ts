import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";
import http from "http";
import { specs } from "./config/swagger";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import insuranceRoutes from "./routes/insurance.routes";
import diagnosisRoutes from "./routes/diagnosis.routes";
import documentRoutes from "./routes/document.routes";
import ledgerRoutes from "./routes/ledger.routes";
import medicationRoutes from "./routes/medication.routes";
import medicationAdminstrationRoutes from "./routes/medicationAdminstration.routes";
import vitalRoutes from "./routes/vital.routes";
import serviceRoutes from "./routes/service.routes";
import physicianRoutes from "./routes/physician.routes";
import immunizationRoutes from "./routes/immunization.routes";
import parentContactRoutes from "./routes/parentContact.routes";
import collateralContactRoutes from "./routes/collateralContact.routes";
import contactNoteRoutes from "./routes/contactNote.routes";
import educationBackgroundRoutes from "./routes/educationBackground.routes";
import employmentRoutes from "./routes/employment.routes";
import socialDeterminantsRoutes from "./routes/socialDeterminants.routes";
import clientSignatureRoutes from "./routes/clientSignature.routes";
import parentSignatureRoutes from "./routes/parentSignature.routes";
import treatmentPlanRoutes from "./routes/treatmentPlan.routes";
import treatmentGoalsRoutes from "./routes/treatmentGoals.routes";
import treatmentObjectiveRoutes from "./routes/treatmentObjective.routes";
import treatmentInterventionRoutes from "./routes/treatmentIntervention.routes";
import dischargeRoutes from "./routes/discharge.routes";
import medicalHistoryRoutes from "./routes/mediaclHistory.routes";
import familyMedicalHistoryRoutes from "./routes/familyMedicalHistory.routes";
import messageRoutes from "./routes/message.routes";
import conversationRoutes from "./routes/conversation.routes";
import userRoutes from "./routes/user.routes";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redisClient from "./config/redis";
import setupMessageSocket from "./sockets/message.socket";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  adapter: createAdapter(redisClient),
  cors: {
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
  },
});
// Middleware
//app.use(cors());
if (!process.env.FRONTEND_URL) {
  throw new Error("No FRONTEND_URl");
}
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/medicationAdminstration", medicationAdminstrationRoutes);
app.use("/api/vitals", vitalRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/physician", physicianRoutes);
app.use("/api/immunization", immunizationRoutes);
app.use("/api/parentContacts", parentContactRoutes);
app.use("/api/collateralContacts", collateralContactRoutes);
app.use("/api/contactNotes", contactNoteRoutes);
app.use("/api/educationBackground", educationBackgroundRoutes);
app.use("/api/employment", employmentRoutes);
app.use("/api/socialDeterminants", socialDeterminantsRoutes);
app.use("/api/clientSignature", clientSignatureRoutes);
app.use("/api/parentSignature", parentSignatureRoutes);
app.use("/api/treatmentPlan", treatmentPlanRoutes);
app.use("/api/treatmentGoals", treatmentGoalsRoutes);
app.use("/api/treatmentObjective", treatmentObjectiveRoutes);
app.use("/api/treatmentIntervention", treatmentInterventionRoutes);
app.use("/api/discharge", dischargeRoutes);
app.use("/api/medicalHistory", medicalHistoryRoutes);
app.use("/api/familyMedicalHistory", familyMedicalHistoryRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/users", userRoutes);
setupMessageSocket(io)

app.get("/", (_req, res) => {
  res.json({ status: "API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export { httpServer };
