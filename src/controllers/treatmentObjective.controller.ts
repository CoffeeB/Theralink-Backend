import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class TreatmentObjectiveController {
  async createTreatmentObjective(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentgoalsId } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const newTreatmentObjective = await prisma.treatmentObjective.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
          treatmentgoals: {
            connect: { id: treatmentgoalsId },
          },
        },
      });

      res.status(201).json({
        message: "TreatmentObjective created successfully",
        TreatmentObjective: newTreatmentObjective,
      });
    } catch (error) {
      console.error("Create TreatmentObjective error:", error);
      res.status(500).json({ error: "Failed to create TreatmentObjective" });
    }
  }

  async getTreatmentObjectives(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentgoalsId } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const TreatmentObjectives = await prisma.treatmentObjective.findMany({
        orderBy: { createdAt: "desc" },
        where: { treatmentgoalsId: treatmentgoalsId },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.treatmentObjective.count({
        where: { treatmentgoalsId: treatmentgoalsId },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        TreatmentObjectives,
      });
    } catch (error) {
      console.error("Get TreatmentObjectives error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentObjectives" });
    }
  }

  async getTreatmentObjectiveById(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id, treatmentgoalsId } = req.params;

      const TreatmentObjective = await prisma.treatmentObjective.findFirst({
        where: { id, treatmentgoalsId: treatmentgoalsId },
      });

      if (!TreatmentObjective) {
        res.status(404).json({ error: "TreatmentObjective not found" });
        return;
      }

      res.status(200).json({ TreatmentObjective });
    } catch (error) {
      console.error("Get TreatmentObjective error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentObjective" });
    }
  }

  async updateTreatmentObjective(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const TreatmentObjective = await prisma.treatmentObjective.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
        },
      });

      res.status(200).json({
        message: "TreatmentObjective updated successfully",
        TreatmentObjective,
      });
    } catch (error) {
      console.error("Update TreatmentObjective error:", error);
      res.status(500).json({ error: "Failed to update TreatmentObjective" });
    }
  }

  async deleteTreatmentObjective(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, treatmentgoalsId } = req.params;

      const TreatmentObjective = await prisma.treatmentObjective.findFirst({
        where: { id, treatmentgoalsId: treatmentgoalsId },
      });

      if (!TreatmentObjective) {
        res.status(404).json({ error: "TreatmentObjective not found" });
        return;
      }

      await prisma.treatmentObjective.delete({
        where: { id },
      });

      res.status(200).json({
        message: "TreatmentObjective deleted successfully",
      });
    } catch (error) {
      console.error("Delete TreatmentObjective error:", error);
      res.status(500).json({ error: "Failed to delete TreatmentObjective" });
    }
  }
}
