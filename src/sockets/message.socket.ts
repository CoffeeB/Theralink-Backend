import { Socket, Server } from "socket.io";
import redisClient from "../config/redis";
import { MessageService } from "../services/message.service";
export default function setupMessageSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    // console.log(`User Connected: ${socket.id}`);

    /**
     * @description Register user for dm
     */
    socket.on("register_user", async ({ userId }) => {
      await redisClient.set(`active_users:${userId}`, JSON.stringify(userId));
      socket.join(`user:${userId}`); // join a room
      io.emit;
    });

    // Send dm Event
    socket.on("send_dm", async (data) => {
      const { toUserId, body, userId, subject, conversationId } = data;
      const toSockerUserId = await redisClient.get(`active_users:${toUserId}`);
      const messageservice = new MessageService();
      let message = await messageservice.createMessageService(
        toUserId,
        body,
        userId,
        subject,
        conversationId
      );
      if (toSockerUserId) {
        // create the message from db
        io.to(`user:${toSockerUserId}`).emit("receive_dm", message);
      }
      io.to(`user:${userId}`).emit("receive_dm", message);
    });

    // Start Typing Event
    socket.on("user_typing", async (data) => {
      const { toUserId } = data;
      const toSockerUserId = await redisClient.get(`active_users:${toUserId}`);

      if (toSockerUserId) {
        io.to(`user:${toUserId}`).emit("user_typing", { user: data.userId });
      }
    });

    // Stopped Typing Event
    socket.on("user_stopped_typing", async (data) => {
      const { toUserId } = data;
      const toSockerUserId = await redisClient.get(toUserId);

      if (toSockerUserId) {
        io.to(`user:${toSockerUserId}`).emit("user_stopped_typing", {
          user: data.userId,
        });
      }
    });
    /**
     * @description  Disconnecting a user from the channel
     */
    socket.on("disconnect", async () => {
      try {
        const redisKeys = await redisClient.keys(`active_users:*`);

        /**
         * get the key that matched the user user id
         */
        const userKey = await Promise.all(
          redisKeys.map(async (key) => {
            const value = await redisClient.get(key);
            return value === socket.id ? key : null;
          })
        ).then((resultKey) => resultKey.find((key) => key !== null));
        const userId = userKey?.split(":")[1];
        if (userId) {
          // delete the user's key
          await redisClient.del(`active_users:${userId}`);
        }
      } catch (error) {
        console.log(`Disconnection error`, error);
      }
    });
  });
}
