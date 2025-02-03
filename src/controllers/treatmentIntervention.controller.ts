import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class TreatmentInterventionController {
  async createTreatmentIntervention(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentobjectiveId } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const newTreatmentIntervention = await prisma.treatmentIntervention.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
          treatmentobjective: {
            connect: { id: treatmentobjectiveId },
          },
        },
      });

      res.status(201).json({
        message: "TreatmentIntervention created successfully",
        TreatmentIntervention: newTreatmentIntervention,
      });
    } catch (error) {
      console.error("Create TreatmentIntervention error:", error);
      res.status(500).json({ error: "Failed to create TreatmentIntervention" });
    }
  }

  async getTreatmentInterventions(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentobjectiveId } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const TreatmentInterventions = await prisma.treatmentIntervention.findMany({
        orderBy: { createdAt: "desc" },
        where: { treatmentobjectiveId: treatmentobjectiveId },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.treatmentIntervention.count({
        where: { treatmentobjectiveId: treatmentobjectiveId },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        TreatmentInterventions,
      });
    } catch (error) {
      console.error("Get TreatmentInterventions error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentInterventions" });
    }
  }

  async getTreatmentInterventionById(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id, treatmentobjectiveId } = req.params;

      const TreatmentIntervention = await prisma.treatmentIntervention.findFirst({
        where: { id, treatmentobjectiveId: treatmentobjectiveId },
      });

      if (!TreatmentIntervention) {
        res.status(404).json({ error: "TreatmentIntervention not found" });
        return;
      }

      res.status(200).json({ TreatmentIntervention });
    } catch (error) {
      console.error("Get TreatmentIntervention error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentIntervention" });
    }
  }

  async updateTreatmentIntervention(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const TreatmentIntervention = await prisma.treatmentIntervention.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
        },
      });

      res.status(200).json({
        message: "TreatmentIntervention updated successfully",
        TreatmentIntervention,
      });
    } catch (error) {
      console.error("Update TreatmentIntervention error:", error);
      res.status(500).json({ error: "Failed to update TreatmentIntervention" });
    }
  }

  async deleteTreatmentIntervention(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, treatmentobjectiveId } = req.params;

      const TreatmentIntervention = await prisma.treatmentIntervention.findFirst({
        where: { id, treatmentobjectiveId: treatmentobjectiveId },
      });

      if (!TreatmentIntervention) {
        res.status(404).json({ error: "TreatmentIntervention not found" });
        return;
      }

      await prisma.treatmentIntervention.delete({
        where: { id },
      });

      res.status(200).json({
        message: "TreatmentIntervention deleted successfully",
      });
    } catch (error) {
      console.error("Delete TreatmentIntervention error:", error);
      res.status(500).json({ error: "Failed to delete TreatmentIntervention" });
    }
  }
}
