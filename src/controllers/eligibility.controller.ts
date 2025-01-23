import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class EligibilityController {
  async checkEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const newEligibility = await prisma.eligibility.create({
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
        message: "Eligibility created successfully",
        eligibility: newEligibility,
      });
    } catch (error) {
      console.error("Create Eligibility error:", error);
      res.status(500).json({ error: "Failed to create Eligibility" });
    }
  }

  async getEligibilitys(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const eligibility = await prisma.eligibility.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.eligibility.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        eligibility,
      });
    } catch (error) {
      console.error("Get eligibility error:", error);
      res.status(500).json({ error: "Failed to fetch Eligibilitys" });
    }
  }

  async getEligibilityById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const eligibility = await prisma.eligibility.findFirst({
        where: { id, patientId: patientid },
      });

      if (!eligibility) {
        res.status(404).json({ error: "Eligibility not found" });
        return;
      }

      res.status(200).json({ eligibility });
    } catch (error) {
      console.error("Get Eligibility error:", error);
      res.status(500).json({ error: "Failed to fetch Eligibility" });
    }
  }

  async updateEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const eligibility = await prisma.eligibility.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });

      res.status(200).json({
        message: "Eligibility updated successfully",
        eligibility,
      });
    } catch (error) {
      console.error("Update Eligibility error:", error);
      res.status(500).json({ error: "Failed to update Eligibility" });
    }
  }

  async deleteEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const eligibility = await prisma.eligibility.findFirst({
        where: { id, patientId: patientid },
      });

      if (!eligibility) {
        res.status(404).json({ error: "eligibility not found" });
        return;
      }

      await prisma.eligibility.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Eligibility deleted successfully",
      });
    } catch (error) {
      console.error("Delete Eligibility error:", error);
      res.status(500).json({ error: "Failed to delete Eligibility" });
    }
  }
}
