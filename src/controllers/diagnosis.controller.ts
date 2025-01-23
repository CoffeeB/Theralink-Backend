import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class DiagnosisController {
  async createDiagnosis(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { diagnosisDate, ...rest } = req.body;
      const newDiagnosis = await prisma.diagnosis.create({
        data: {
          ...rest,
          diagnosisDate: new Date(diagnosisDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Diagnosis created successfully",
        Diagnosis: newDiagnosis,
      });
    } catch (error) {
      console.error("Create Diagnosis error:", error);
      res.status(500).json({ error: "Failed to create Diagnosis" });
    }
  }

  async getDiagnosiss(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const diagnosis = await prisma.diagnosis.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.diagnosis.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        diagnosis,
      });
    } catch (error) {
      console.error("Get Diagnosiss error:", error);
      res.status(500).json({ error: "Failed to fetch Diagnosiss" });
    }
  }

  async getDiagnosisById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Diagnosis = await prisma.diagnosis.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Diagnosis) {
        res.status(404).json({ error: "Diagnosis not found" });
        return;
      }

      res.status(200).json({ Diagnosis });
    } catch (error) {
      console.error("Get Diagnosis error:", error);
      res.status(500).json({ error: "Failed to fetch Diagnosis" });
    }
  }

  async updateDiagnosis(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { diagnosisDate, ...rest } = req.body;
      const Diagnosis = await prisma.diagnosis.update({
        where: { id },
        data: {
          ...rest,
          diagnosisDate: new Date(diagnosisDate),
        },
      });

      res.status(200).json({
        message: "Diagnosis updated successfully",
        Diagnosis,
      });
    } catch (error) {
      console.error("Update Diagnosis error:", error);
      res.status(500).json({ error: "Failed to update Diagnosis" });
    }
  }

  async deleteDiagnosis(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Diagnosis = await prisma.diagnosis.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Diagnosis) {
        res.status(404).json({ error: "Diagnosis not found" });
        return;
      }

      await prisma.diagnosis.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Diagnosis deleted successfully",
      });
    } catch (error) {
      console.error("Delete Diagnosis error:", error);
      res.status(500).json({ error: "Failed to delete Diagnosis" });
    }
  }
}
