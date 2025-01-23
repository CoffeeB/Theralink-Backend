import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class MedicationController {
  async createMedication(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const newMedication = await prisma.medication.create({
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
        message: "Medication created successfully",
        Medication: newMedication,
      });
    } catch (error) {
      console.error("Create Medication error:", error);
      res.status(500).json({ error: "Failed to create Medication" });
    }
  }

  async getMedications(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Medications = await prisma.medication.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.medication.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Medications,
      });
    } catch (error) {
      console.error("Get Medications error:", error);
      res.status(500).json({ error: "Failed to fetch Medications" });
    }
  }

  async getMedicationById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Medication = await prisma.medication.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Medication) {
        res.status(404).json({ error: "Medication not found" });
        return;
      }

      res.status(200).json({ Medication });
    } catch (error) {
      console.error("Get Medication error:", error);
      res.status(500).json({ error: "Failed to fetch Medication" });
    }
  }

  async updateMedication(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const Medication = await prisma.medication.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });

      res.status(200).json({
        message: "Medication updated successfully",
        Medication,
      });
    } catch (error) {
      console.error("Update Medication error:", error);
      res.status(500).json({ error: "Failed to update Medication" });
    }
  }

  async deleteMedication(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Medication = await prisma.medication.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Medication) {
        res.status(404).json({ error: "Medication not found" });
        return;
      }

      await prisma.medication.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Medication deleted successfully",
      });
    } catch (error) {
      console.error("Delete Medication error:", error);
      res.status(500).json({ error: "Failed to delete Medication" });
    }
  }
}
