import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class EmploymentController {
  async createEmployment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const newEmployment = await prisma.employment.create({
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
        message: "Employment created successfully",
        Employment: newEmployment,
      });
    } catch (error) {
      console.error("Create Employment error:", error);
      res.status(500).json({ error: "Failed to create Employment" });
    }
  }

  async getEmployments(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Employment = await prisma.employment.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.employment.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Employment,
      });
    } catch (error) {
      console.error("Get Employments error:", error);
      res.status(500).json({ error: "Failed to fetch Employments" });
    }
  }

  async getEmploymentById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Employment = await prisma.employment.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Employment) {
        res.status(404).json({ error: "Employment not found" });
        return;
      }

      res.status(200).json({ Employment });
    } catch (error) {
      console.error("Get Employment error:", error);
      res.status(500).json({ error: "Failed to fetch Employment" });
    }
  }

  async updateEmployment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...rest } = req.body;

      const Employment = await prisma.employment.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });

      res.status(200).json({
        message: "Employment updated successfully",
        Employment,
      });
    } catch (error) {
      console.error("Update Employment error:", error);
      res.status(500).json({ error: "Failed to update Employment" });
    }
  }

  async deleteEmployment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Employment = await prisma.employment.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Employment) {
        res.status(404).json({ error: "Employment not found" });
        return;
      }

      await prisma.employment.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Employment deleted successfully",
      });
    } catch (error) {
      console.error("Delete Employment error:", error);
      res.status(500).json({ error: "Failed to delete Employment" });
    }
  }
}
