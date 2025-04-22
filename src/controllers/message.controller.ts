import { Request as ExpressRequest, Response } from "express";
import moment from "moment";
import prisma from "../config/database";
import { IUser } from "../interfaces/auth.interfaces";
import { MessageService } from "../services/message.service";
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
      const user = req.user as IUser;
      const { conversationId } = req.params;
      // const messageService = new MessageService()

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
            updatedAt: moment(Date.now()).format("DDD MMM YYY"),
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
    const user = req.user as IUser;
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const Messages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          conversationId: req.params.conversationId,
          isDeleted: false,
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
  // new MessageService().updateMessageReadStatus

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
      const messageService = new MessageService();
      const message = await messageService.getSingleMessageService(id);

      if (!message) {
        return res.status(404).json({ error: "message not found" });
      }

      return res.status(200).json({ message });
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
      const user = req.user as IUser;
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
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Get Aggregated Usre's Message
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async getUserMessage(req: CustomInterface, res: Response) {
    try {
      const user = req.user as IUser;

      const message = new MessageService();
      const {
        totalMessages,
        readMessages,
        unreadMessages,
        inboxMessages,
        importantMessages,
      } = await message.getUserMessageCounts(user?.id);

      return res.status(200).json({
        message: "Message updated successfully",
        totalMessages,
        readMessages,
        unreadMessages,
        inboxMessages,
        importantMessages,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Mark Message As Read
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async markMessageAsRead(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageReadStatus(
        id,
        user?.id,
        true
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Mark Message As UnRead
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async markMessageAsUnRead(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageReadStatus(
        id,
        user?.id,
        false
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Mark Message As Read
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async markMessageAsImportant(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageImportantStatus(
        id,
        user?.id,
        true
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Mark Message As UnRead
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async markMessageAsUnImportant(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageImportantStatus(
        id,
        user?.id,
        false
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }

  /**
   * @description Add Message to Thrash
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async addMessageToTrash(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageDeletedStatus(
        id,
        user?.id,
        true
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
    }
  }
  /**
   * @description Remove Message From Thrash
   * @param req
   * @param res
   * @method PUT
   * @returns
   */
  async removeMessageFromTrash(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const messageService = new MessageService();
      const newMessage = await messageService.updateMessageDeletedStatus(
        id,
        user?.id,
        false
      );

      return res.status(200).json({
        message: "Message updated successfully",
        newMessage,
      });
    } catch (error) {
      console.error("update message error:", error);
      return res.status(500).json({ error: "Failed to update message" });
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
      const messageService = new MessageService();
      const user = req.user as IUser;
      const message = await messageService.getSingleMessageService(id);
      if (!message) {
        return res.status(404).json({ error: "message not found" });
      }
      const alertmessage = await messageService.deleteMessageService(
        id,
        user.id
      );

      return res.status(200).json({
        message: alertmessage,
      });
    } catch (error) {
      console.error("Delete Message error:", error);
      return res.status(500).json({ error: "Failed to delete Message" });
    }
  }
}
