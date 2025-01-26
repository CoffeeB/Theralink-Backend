import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ParentSignatureController {
  async createParentSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newParentSignature = await prisma.parentSignature.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Client signature created successfully",
        ParentSignature: newParentSignature,
      });
    } catch (error) {
      console.error("Create ParentSignature error:", error);
      res.status(500).json({ error: "Failed to create ParentSignature" });
    }
  }

  async getParentSignatures(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const ParentSignature = await prisma.parentSignature.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.parentSignature.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        ParentSignature,
      });
    } catch (error) {
      console.error("Get ParentSignatures error:", error);
      res.status(500).json({ error: "Failed to fetch ParentSignatures" });
    }
  }

  async getParentSignatureById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ParentSignature = await prisma.parentSignature.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ParentSignature) {
        res.status(404).json({ error: "ParentSignature not found" });
        return;
      }

      res.status(200).json({ ParentSignature });
    } catch (error) {
      console.error("Get ParentSignature error:", error);
      res.status(500).json({ error: "Failed to fetch ParentSignature" });
    }
  }

  async updateParentSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const ParentSignature = await prisma.parentSignature.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "Client signature updated successfully",
        ParentSignature,
      });
    } catch (error) {
      console.error("Update ParentSignature error:", error);
      res.status(500).json({ error: "Failed to update ParentSignature" });
    }
  }

  async deleteParentSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ParentSignature = await prisma.parentSignature.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ParentSignature) {
        res.status(404).json({ error: "ParentSignature not found" });
        return;
      }

      await prisma.parentSignature.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Client signature deleted successfully",
      });
    } catch (error) {
      console.error("Delete ParentSignature error:", error);
      res.status(500).json({ error: "Failed to delete ParentSignature" });
    }
  }
}
