import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomInterface extends ExpressRequest {
  user?:IUser
}

export class FamilyMedicalHistoryController {
  async createFamilyMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const {patientid} = req.params
      const { ...rest } = req.body;
      const newFamilyMedicalHistory = await prisma.familyMedicalHistory.create({
        data: {
          ...rest,
          
          patient: {
            connect: { id: patientid },
          },
        },
      });

      return res.status(201).json({
        message: "Medical History created successfully",
        FamilymedicalHistory: newFamilyMedicalHistory,
      });
    } catch (error) {
      console.error("Create FamilymedicalHistory error:", error);
      return res.status(500).json({ error: "Failed to create FamilymedicalHistory" });
    }
  }

  async getFamilyMedicalHistorys(req: CustomInterface, res: Response) {
    const {patientid} = req.params
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const FamilyMedicalHistorys = await prisma.familyMedicalHistory.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          patientId: patientid,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.familyMedicalHistory.count({
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
          FamilyMedicalHistorys,
        });
    } catch (error) {
      console.error("Get FamilyMedicalHistorys error:", error);
      return res.status(500).json({ error: "Failed to fetch FamilyMedicalHistorys" });
    }
  }

  async getFamilyMedicalHistoryById(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const FamilymedicalHistory = await prisma.familyMedicalHistory.findUnique({
        where: { id, patientId:patientid },
      });

      if (!FamilymedicalHistory) {
        return res.status(404).json({ error: "FamilymedicalHistory not found" });
      }

      return res.status(200).json({ FamilymedicalHistory });
    } catch (error) {
      console.error("Get FamilymedicalHistory error:", error);
      return res.status(500).json({ error: "Failed to fetch FamilymedicalHistory" });
    }
  }

  async updateFamilyMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const { ...rest } = req.body;
      const FamilymedicalHistory = await prisma.familyMedicalHistory.update({
        where: { id, patientId: patientid },
        data: {
          ...rest,
        },
      });

      return res.status(200).json({
        message: "Medical History updated successfully",
        FamilymedicalHistory,
      });
    } catch (error) {
      console.error("Update FamilymedicalHistory error:", error);
      return res.status(500).json({ error: "Failed to update FamilymedicalHistory" });
    }
  }

  async deleteFamilyMedicalHistory(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const FamilymedicalHistory = await prisma.familyMedicalHistory.findUnique({
        where: { id, patientId:patientid },
      });

      if (!FamilymedicalHistory) {
        return res.status(404).json({ error: "FamilymedicalHistory not found" });
      }
      await prisma.familyMedicalHistory.delete({
        where: { id, patientId: patientid },
      });

      return res.status(200).json({
        message: "Medical History deleted successfully",
      });
    } catch (error) {
      console.error("Delete FamilymedicalHistory error:", error);
      return res.status(500).json({ error: "Failed to delete FamilymedicalHistory" });
    }
  }
}
