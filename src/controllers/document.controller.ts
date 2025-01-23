import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class DocumentController {
  async createDocument(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newDocument = await prisma.document.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Document created successfully",
        document: newDocument,
      });
    } catch (error) {
      console.error("Create Document error:", error);
      res.status(500).json({ error: "Failed to create Document" });
    }
  }

  async getDocuments(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const document = await prisma.document.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.document.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        document,
      });
    } catch (error) {
      console.error("Get Documents error:", error);
      res.status(500).json({ error: "Failed to fetch Documents" });
    }
  }

  async getDocumentById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Document = await prisma.document.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Document) {
        res.status(404).json({ error: "Document not found" });
        return;
      }

      res.status(200).json({ Document });
    } catch (error) {
      console.error("Get Document error:", error);
      res.status(500).json({ error: "Failed to fetch Document" });
    }
  }

  async updateDocument(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const Document = await prisma.document.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "Document updated successfully",
        Document,
      });
    } catch (error) {
      console.error("Update Document error:", error);
      res.status(500).json({ error: "Failed to update Document" });
    }
  }

  async deleteDocument(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const document = await prisma.document.findFirst({
        where: { id, patientId: patientid },
      });

      if (!document) {
        res.status(404).json({ error: "Document not found" });
        return;
      }

      await prisma.document.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Document deleted successfully",
      });
    } catch (error) {
      console.error("Delete Document error:", error);
      res.status(500).json({ error: "Failed to delete Document" });
    }
  }
}
