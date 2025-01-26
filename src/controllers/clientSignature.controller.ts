import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ClientSignatureController {
  async createClientSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newClientSignature = await prisma.clientSignature.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Client signature created successfully",
        ClientSignature: newClientSignature,
      });
    } catch (error) {
      console.error("Create ClientSignature error:", error);
      res.status(500).json({ error: "Failed to create ClientSignature" });
    }
  }

  async getClientSignatures(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const ClientSignature = await prisma.clientSignature.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.clientSignature.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        ClientSignature,
      });
    } catch (error) {
      console.error("Get ClientSignatures error:", error);
      res.status(500).json({ error: "Failed to fetch ClientSignatures" });
    }
  }

  async getClientSignatureById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ClientSignature = await prisma.clientSignature.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ClientSignature) {
        res.status(404).json({ error: "ClientSignature not found" });
        return;
      }

      res.status(200).json({ ClientSignature });
    } catch (error) {
      console.error("Get ClientSignature error:", error);
      res.status(500).json({ error: "Failed to fetch ClientSignature" });
    }
  }

  async updateClientSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const ClientSignature = await prisma.clientSignature.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "Client signature updated successfully",
        ClientSignature,
      });
    } catch (error) {
      console.error("Update ClientSignature error:", error);
      res.status(500).json({ error: "Failed to update ClientSignature" });
    }
  }

  async deleteClientSignature(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ClientSignature = await prisma.clientSignature.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ClientSignature) {
        res.status(404).json({ error: "ClientSignature not found" });
        return;
      }

      await prisma.clientSignature.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Client signature deleted successfully",
      });
    } catch (error) {
      console.error("Delete ClientSignature error:", error);
      res.status(500).json({ error: "Failed to delete ClientSignature" });
    }
  }
}
