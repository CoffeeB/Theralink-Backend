import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomInterface extends ExpressRequest {
  user?:IUser
}

export class MedicalHistoryController {
  async createMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const {patientid} = req.params
   
      const newMedicalHistory = await prisma.medicalHistory.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      return res.status(201).json({
        message: "Medical History created successfully",
        medicalHistory: newMedicalHistory,
      });
    } catch (error) {
      console.error("Create medicalHistory error:", error);
      return res.status(500).json({ error: "Failed to create medicalHistory" });
    }
  }

  async getMedicalHistorys(req: CustomInterface, res: Response) {
    const {patientid} = req.params
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const MedicalHistorys = await prisma.medicalHistory.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          patientId: patientid,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.medicalHistory.count({
        where: {
          patientId: patientid,
        },
      });
      return res
        .status(200)
        .json({
          totalCount,
          totalPages: Math.ceil(totalCount / parsedLimit),
          currentPage: parsedPage,
          MedicalHistorys,
        });
    } catch (error) {
      console.error("Get MedicalHistorys error:", error);
      return res.status(500).json({ error: "Failed to fetch MedicalHistorys" });
    }
  }

  async getMedicalHistoryById(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const medicalHistory = await prisma.medicalHistory.findUnique({
        where: { id, patientId:patientid },
      });

      if (!medicalHistory) {
        return res.status(404).json({ error: "medicalHistory not found" });
      }

      return res.status(200).json({ medicalHistory });
    } catch (error) {
      console.error("Get medicalHistory error:", error);
      return res.status(500).json({ error: "Failed to fetch medicalHistory" });
    }
  }

  async updateMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const medicalHistory = await prisma.medicalHistory.update({
        where: { id, patientId: patientid },
        data: {
          ...req.body
        },
      });

      return res.status(200).json({
        message: "Medical History updated successfully",
        medicalHistory,
      });
    } catch (error) {
      console.error("Update medicalHistory error:", error);
      return res.status(500).json({ error: "Failed to update medicalHistory" });
    }
  }

  async deleteMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const medicalHistory = await prisma.medicalHistory.findUnique({
        where: { id, patientId:patientid },
      });

      if (!medicalHistory) {
        return res.status(404).json({ error: "medicalHistory not found" });
      }
      await prisma.medicalHistory.delete({
        where: { id, patientId: patientid },
      });

      return res.status(200).json({
        message: "Medical History deleted successfully",
      });
    } catch (error) {
      console.error("Delete medicalHistory error:", error);
      return res.status(500).json({ error: "Failed to delete medicalHistory" });
    }
  }
}
