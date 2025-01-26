import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class EducationBackgroundController {
  async createEducationBackground(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newEducationBackground = await prisma.educationBackground.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Education Background created successfully",
        EducationBackground: newEducationBackground,
      });
    } catch (error) {
      console.error("Create EducationBackground error:", error);
      res.status(500).json({ error: "Failed to create EducationBackground" });
    }
  }

  async getEducationBackgrounds(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const EducationBackground = await prisma.educationBackground.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.educationBackground.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        EducationBackground,
      });
    } catch (error) {
      console.error("Get EducationBackgrounds error:", error);
      res.status(500).json({ error: "Failed to fetch EducationBackgrounds" });
    }
  }

  async getEducationBackgroundById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const EducationBackground = await prisma.educationBackground.findFirst({
        where: { id, patientId: patientid },
      });

      if (!EducationBackground) {
        res.status(404).json({ error: "EducationBackground not found" });
        return;
      }

      res.status(200).json({ EducationBackground });
    } catch (error) {
      console.error("Get EducationBackground error:", error);
      res.status(500).json({ error: "Failed to fetch EducationBackground" });
    }
  }

  async updateEducationBackground(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const EducationBackground = await prisma.educationBackground.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "Education Background updated successfully",
        EducationBackground,
      });
    } catch (error) {
      console.error("Update EducationBackground error:", error);
      res.status(500).json({ error: "Failed to update EducationBackground" });
    }
  }

  async deleteEducationBackground(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const EducationBackground = await prisma.educationBackground.findFirst({
        where: { id, patientId: patientid },
      });

      if (!EducationBackground) {
        res.status(404).json({ error: "EducationBackground not found" });
        return;
      }

      await prisma.educationBackground.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Education Background deleted successfully",
      });
    } catch (error) {
      console.error("Delete EducationBackground error:", error);
      res.status(500).json({ error: "Failed to delete EducationBackground" });
    }
  }
}
