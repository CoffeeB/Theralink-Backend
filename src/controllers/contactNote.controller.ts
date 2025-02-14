import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ContactNoteController {
  async createContactNote(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { contactDate, contactTime, ...rest } = req.body;
      const newContactNote = await prisma.contactNote.create({
        data: {
          ...rest,
          contactTime: new Date(contactTime),
          contactDate: new Date(contactDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "ContactNote created successfully",
        ContactNote: newContactNote,
      });
    } catch (error) {
      console.error("Create ContactNote error:", error);
      res.status(500).json({ error: "Failed to create ContactNote" });
    }
  }

  async getContactNotes(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const ContactNote = await prisma.contactNote.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.contactNote.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        ContactNote,
      });
    } catch (error) {
      console.error("Get ContactNotes error:", error);
      res.status(500).json({ error: "Failed to fetch ContactNotes" });
    }
  }

  async getContactNoteById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ContactNote = await prisma.contactNote.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ContactNote) {
        res.status(404).json({ error: "ContactNote not found" });
        return;
      }

      res.status(200).json({ ContactNote });
    } catch (error) {
      console.error("Get ContactNote error:", error);
      res.status(500).json({ error: "Failed to fetch ContactNote" });
    }
  }

  async updateContactNote(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { contactTime, contactDate, ...rest } = req.body;
      const ContactNote = await prisma.contactNote.update({
        where: { id },
        data: {
          ...rest,
          contactTime: new Date(contactTime),
          contactDate: new Date(contactDate),
        },
      });

      res.status(200).json({
        message: "ContactNote updated successfully",
        ContactNote,
      });
    } catch (error) {
      console.error("Update ContactNote error:", error);
      res.status(500).json({ error: "Failed to update ContactNote" });
    }
  }

  async deleteContactNote(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ContactNote = await prisma.contactNote.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ContactNote) {
        res.status(404).json({ error: "ContactNote not found" });
        return;
      }

      await prisma.contactNote.delete({
        where: { id },
      });

      res.status(200).json({
        message: "ContactNote deleted successfully",
      });
    } catch (error) {
      console.error("Delete ContactNote error:", error);
      res.status(500).json({ error: "Failed to delete ContactNote" });
    }
  }
}
