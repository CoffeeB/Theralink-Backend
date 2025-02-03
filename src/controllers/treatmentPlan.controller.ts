import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class TreatmentPlanController {
  async createTreatmentPlan(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const newTreatmentPlan = await prisma.treatmentPlan.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "TreatmentPlan created successfully",
        TreatmentPlan: newTreatmentPlan,
      });
    } catch (error) {
      console.error("Create TreatmentPlan error:", error);
      res.status(500).json({ error: "Failed to create TreatmentPlan" });
    }
  }
  
  async getTreatmentPlans(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const TreatmentPlans = await prisma.treatmentPlan.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.treatmentPlan.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        TreatmentPlans,
      });
    } catch (error) {
      console.error("Get TreatmentPlans error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentPlans" });
    }
  }

  async getTreatmentPlanById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const TreatmentPlan = await prisma.treatmentPlan.findFirst({
        where: { id, patientId: patientid },
      });

      if (!TreatmentPlan) {
        res.status(404).json({ error: "TreatmentPlan not found" });
        return;
      }

      res.status(200).json({ TreatmentPlan });
    } catch (error) {
      console.error("Get TreatmentPlan error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentPlan" });
    }
  }

  async updateTreatmentPlan(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const TreatmentPlan = await prisma.treatmentPlan.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });

      res.status(200).json({
        message: "TreatmentPlan updated successfully",
        TreatmentPlan,
      });
    } catch (error) {
      console.error("Update TreatmentPlan error:", error);
      res.status(500).json({ error: "Failed to update TreatmentPlan" });
    }
  }

  async deleteTreatmentPlan(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const TreatmentPlan = await prisma.treatmentPlan.findFirst({
        where: { id, patientId: patientid },
      });

      if (!TreatmentPlan) {
        res.status(404).json({ error: "TreatmentPlan not found" });
        return;
      }

      await prisma.treatmentPlan.delete({
        where: { id },
      });

      res.status(200).json({
        message: "TreatmentPlan deleted successfully",
      });
    } catch (error) {
      console.error("Delete TreatmentPlan error:", error);
      res.status(500).json({ error: "Failed to delete TreatmentPlan" });
    }
  }
}
