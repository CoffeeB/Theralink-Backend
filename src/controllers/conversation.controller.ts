import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomInterface extends ExpressRequest {
  user?: IUser;
}

export class ConversationController {
  /**
   * @description Create  A Conversationsrc/controllers/conversation.controller.ts
   * @param req 
   * @param res 
   * @method POST
   * @returns 
   */
  async createConversation(req: CustomInterface, res: Response) {
    try {
      const { date, status, patientid, ...rest } = req.body;
      const user = req.user as IUser | undefined;

      // Checking if there's an existing Conversation at the same time for a particular patient
      const conflictingConversation = await prisma.conversation.findFirst({
        where: {
          userId: user?.id,
        },
      });

      if (conflictingConversation) {
        return res.status(400).json({
          error: "This conversation already exists",
        });
      }

      const newConversation = await prisma.conversation.create({
        data: {
          ...rest,
          user: {
            connect: { id: user?.id },
          },
        },
      });

      return res.status(201).json({
        message: "Conversation created successfully",
        Conversation: newConversation,
      });
    } catch (error) {
      console.error("Create Conversation error:", error);
      return res.status(500).json({ error: "Failed to create Conversation" });
    }
  }

  /**
   * @description Get All Conversation of a User
   * @param req 
   * @param res 
   * @method GET
   * @returns 
   */
  async getConversations(req: CustomInterface, res: Response) {
    const user = req.user as IUser | undefined;
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const Conversations = await prisma.conversation.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          userId: user?.id,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.conversation.count({
        where: { userId: user?.id },
      });
      return res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Conversations,
      });
    } catch (error) {
      console.error("Get Conversations error:", error);
      return res.status(500).json({ error: "Failed to fetch Conversations" });
    }
  }

  /**
   * @description Get Conversation By Id
   * @param req 
   * @param res   
   * @method GET
   * @returns 
   */
  async getConversationById(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const conversation = await prisma.conversation.findUnique({
        where: { id },
      });

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      return res.status(200).json({ conversation });
    } catch (error) {
      console.error("Get Conversation error:", error);
      return res.status(500).json({ error: "Failed to fetch Conversation" });
    }
  }

  /**
   * @description Update A Conversation
   * @param req 
   * @param res 
   * @method PUT
   * @returns 
   */
  async updateConversation(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const user = req.user as IUser | undefined;
      const Conversation = await prisma.conversation.update({
        where: { id, userId: user?.id },
        data: {
          ...rest,
        },
      });

      return res.status(200).json({
        message: "Conversation updated successfully",
        Conversation,
      });
    } catch (error) {
      console.error("Updateppointment error:", error);
      return res.status(500).json({ error: "Failed to Updateppointment" });
    }
  }

  
  /**
   * @description delete A Conversation
   * @param req 
   * @param res 
   * @method DELETE
   * @returns 
   */
  async deleteConversation(req: CustomInterface, res: Response) {
    try {
      const { id } = req.params;
      await prisma.conversation.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Conversation deleted successfully",
      });
    } catch (error) {
      console.error("Delete Conversation error:", error);
      return res.status(500).json({ error: "Failed to delete Conversation" });
    }
  }
}
