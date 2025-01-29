import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomInterface extends ExpressRequest {
  user?: IUser;
}

export class MessageController {
  /**
   * @description Create  A Message
   * @param req
   * @param res
   * @method POST
   * @returns
   */
  async createMessage(req: CustomInterface, res: Response) {
    try {
      const { body, ...rest } = req.body;
      const user = req.user as IUser | undefined;
      const { conversationId } = req.params;

      const newMessage = await prisma.message.create({
        data: {
          ...rest,
          user: {
            connect: { id: user?.id },
          },
          conversationId,
        },
      });
      if (newMessage) {
        await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            lastMessage: body,
          },
        });
      }

      return res.status(201).json({
        message: "Message created successfully",
        Message: newMessage,
      });
    } catch (error) {
      console.error("Create Message error:", error);
      return res.status(500).json({ error: "Failed to create Message" });
    }
  }

  /**
   * @description Get All Message of a User
   * @param req
   * @param res
   * @method GET
   * @returns
   */
  async getMessages(req: CustomInterface, res: Response) {
    const user = req.user as IUser | undefined;
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const Messages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          userId: user?.id,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.message.count({
        where: { userId: user?.id },
      });
      return res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Messages,
      });
    } catch (error) {
      console.error("Get Messages error:", error);
      return res.status(500).json({ error: "Failed to fetch Messages" });
    }
  }

  /**
   * @description Get Message By Id
   * @param req
   * @param res
   * @method GET
   * @returns
   */
  async getMessageById(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const Message = await prisma.message.findUnique({
        where: { id },
      });

      if (!Message) {
        return res.status(404).json({ error: "Message not found" });
      }

      return res.status(200).json({ Message });
    } catch (error) {
      console.error("Get Message error:", error);
      return res.status(500).json({ error: "Failed to fetch Message" });
    }
  }

  /**
   * @description Update A Message
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async updateMessage(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const user = req.user as IUser | undefined;
      const Message = await prisma.message.update({
        where: { id, userId: user?.id },
        data: {
          ...rest,
        },
      });

      return res.status(200).json({
        message: "Message updated successfully",
        Message,
      });
    } catch (error) {
      console.error("Updateppointment error:", error);
      return res.status(500).json({ error: "Failed to Updateppointment" });
    }
  }

  /**
   * @description delete A Message
   * @param req
   * @param res
   * @method DELETE
   * @returns
   */
  async deleteMessage(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      await prisma.message.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Message deleted successfully",
      });
    } catch (error) {
      console.error("Delete Message error:", error);
      return res.status(500).json({ error: "Failed to delete Message" });
    }
  }
}
