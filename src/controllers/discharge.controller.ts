import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class DischargeController {
  async createDischarge(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { dischargeDate, ...rest } = req.body;
      const newDischarge = await prisma.discharge.create({
        data: {
          ...rest,
          dischargeDate: new Date(dischargeDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Discharge created successfully",
        Discharge: newDischarge,
      });
    } catch (error) {
      console.error("Create Discharge error:", error);
      res.status(500).json({ error: "Failed to create Discharge" });
    }
  }

  async getDischarges(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Discharge = await prisma.discharge.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.discharge.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Discharge,
      });
    } catch (error) {
      console.error("Get Discharges error:", error);
      res.status(500).json({ error: "Failed to fetch Discharges" });
    }
  }

  async getDischargeById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Discharge = await prisma.discharge.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Discharge) {
        res.status(404).json({ error: "Discharge not found" });
        return;
      }

      res.status(200).json({ Discharge });
    } catch (error) {
      console.error("Get Discharge error:", error);
      res.status(500).json({ error: "Failed to fetch Discharge" });
    }
  }

  async updateDischarge(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { dischargeDate, ...rest } = req.body;
      const Discharge = await prisma.discharge.update({
        where: { id },
        data: {
          dischargeDate: new Date(dischargeDate),
          ...rest,
        },
      });

      res.status(200).json({
        message: "Discharge updated successfully",
        Discharge,
      });
    } catch (error) {
      console.error("Update Discharge error:", error);
      res.status(500).json({ error: "Failed to update Discharge" });
    }
  }

  async deleteDischarge(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Discharge = await prisma.discharge.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Discharge) {
        res.status(404).json({ error: "Discharge not found" });
        return;
      }

      await prisma.discharge.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Discharge deleted successfully",
      });
    } catch (error) {
      console.error("Delete Discharge error:", error);
      res.status(500).json({ error: "Failed to delete Discharge" });
    }
  }
}
