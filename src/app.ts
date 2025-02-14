import swaggerUi from "swagger-ui-express";
// import { Server } from "socket.io";
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
// import redisClient from "./config/redis";
// familyhistory

const app = express();
const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: [process.env.FRONTEND_URL || "https://admin.socket.io"],
//   },
// });
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
// familyMedicalHistoryRoutes
// Health check route

// const publisher = redisClient;
// const subscriber1 = redisClient;
// const subscriber2 = redisClient;
// const subscriber3 = redisClient;

// // subscriptions
// subscriber1.subscribe("theralink_chats");
// subscriber2.subscribe("theralink_rooms");
// subscriber3.subscribe("theralink_users");
// var connection: { [key: string]: string } = {};
// listener
// io.on("connection", (socket) => {
//   socket.emit("log", `app is connected at ${process.env.API_URL}`);

//   // send list of available rooms
//   publisher.lrange("Theralink_Rooms", 0, -1, (_err, reply) => {
//     if (reply) {
//       socket.emit("rooms", JSON.stringify(reply));
//     }
//   });

//   // Messaging
//   socket.on("message", async (messages) => {
//     publisher.publish("theralink_chats", JSON.stringify(messages));
//     console.log("Socket has been disconnected");
//     // save it to db
//     // emit based on the unicast
//   });

//   // Room Joining
//   socket.on("join_room", async (msg) => {
//     const data = JSON.parse(msg);
//     // Store the user's id for directing messaging
//     connection[data.user] = socket.id;
//     socket.join(data.room);
//     // Check if the room already exists in Redis.
//     publisher.get(data.room, (_err, reply) => {
//       // Register the room
//       publisher.set(data.room, "1");
//       if (!reply) {
//         // Register the room to the Theralink_Rooms list
//         publisher.lpush(
//           "Theralink_Rooms",
//           data.room,
//           (_err: any, _reply: any) => {}
//         );
//         // Notifying other theralink servers that a room has been created
//         publisher.publish("theralink_rooms", "1");
//       }
//     });
//     // Register the user in the room_meta_data list
//     publisher.lpush(
//       `${data.room}_meta`,
//       data.user,
//       (_err: any, _reply: any) => {}
//     );
//     // Notifying other theralink server that a user has join a room
//     publisher.publish("theralink_users", data.user);
//   });
//   // publish users
//   socket.on("diconnection", () => {
//     socket.emit("Socket has been disconnected");
//   });
// });

// // Consume the Theralink Channel for DM AND Group messages
// subscriber1.on("message", async (channel, message) => {
//   if (channel === "theralink_chats") {
//     const data = JSON.parse(message);
//     // data:{toUser:string, isBroadCast:boolean, unicast: boolean}
//     // handler for unicast:DM
//     if (data.unicast) {
//       // Check if the key is in the connection object
//       if (data.toUser in connection) {
//         io.to(connection[data.toUser]).emit("message", data);
//       }
//     } else {
//       // handler for multicast: rooms messages
//       io.to(data.room).emit("message", data);
//     }
//   }
// });

// // Consume the Theralink Channel for Rooms Information
// subscriber2.on("message", async (channel, _message) => {
//   if (channel === "theralink_rooms") {
//     publisher.lrange("Theralink_Rooms", 0, -1, (_err, reply) => {
//       if (reply) {
//         io.emit("rooms", JSON.stringify(reply));
//       }
//     });
//   }
// });

// // Consume the Theralink Channel for User's Information in a Room

// subscriber3.on("message", async (channel, room) => {
//   if (channel === "theralink_rooms") {
//     publisher.lrange(`${room}_meta`, 0, -1, (_err, reply) => {
//       if (reply) {
//         io.to(room).emit("roomusers", JSON.stringify(reply));
//       }
//     });
//   }
// });

app.get("/", (_req, res) => {
  res.json({ status: "API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export { httpServer };
