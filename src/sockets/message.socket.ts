import { Socket, Server } from "socket.io";
import { MessageService } from "src/services/message.service";

const activeConnections = new Map();
export default function setupMessageSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    // console.log(`User Connected: ${socket.id}`);

    // join dm room Event
    socket.on("register_user", async (data) => {
      activeConnections.set(data.userId, socket.id);
      console.log("Number of Connections", activeConnections);
    });

    // Send dm Event
    socket.on("send_dm", async (data) => {
      const { toUserId, body, userId, subject, conversationId } = data;
      if (activeConnections.has(toUserId)) {
        const toSockerUserId = activeConnections.get(toUserId);
        const messageservice = new MessageService();
        let message = await messageservice.createMessageService(
          toUserId,
          body,
          userId,
          subject,
          conversationId
        );
        // create the message from db
        io.to(toSockerUserId).emit("receive_dm", message);
      }
    });

    // Start Typing Event
    socket.on("user_typing", async (data) => {
      const { toUserId } = data;
      if (activeConnections.has(toUserId)) {
        const toSockerUserId = activeConnections.get(toUserId);
        io.to(toSockerUserId).emit("user_typing", { user: data.userId });
      }
    });

    // Stopped Typing Event
    socket.on("user_stopped_typing", async (data) => {
      const { toUserId } = data;
      if (activeConnections.has(toUserId)) {
        const toSockerUserId = activeConnections.get(toUserId);
        io.to(toSockerUserId).emit("user_stopped_typing", {
          user: data.userId,
        });
      }
    });
  });
}
