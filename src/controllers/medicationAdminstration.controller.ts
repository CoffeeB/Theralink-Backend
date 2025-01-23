import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class MedicationAdminstrationController {
  async createMedicationAdminstration(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { patientid } = req.params;
      const { administeredDate, ...rest } = req.body;
      const newMedicationAdminstration =
        await prisma.medicationAdminstration.create({
          data: {
            ...rest,
            administeredDate: new Date(administeredDate),
            patient: {
              connect: { id: patientid },
            },
          },
        });

      res.status(201).json({
        message: "MedicationAdminstration created successfully",
        MedicationAdminstration: newMedicationAdminstration,
      });
    } catch (error) {
      console.error("Create MedicationAdminstration error:", error);
      res
        .status(500)
        .json({ error: "Failed to create MedicationAdminstration" });
    }
  }

  async getMedicationAdminstrations(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const MedicationAdminstrations =
        await prisma.medicationAdminstration.findMany({
          orderBy: { createdAt: "desc" },
          where: { patientId: patientid },
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        });

      const totalCount = await prisma.medicationAdminstration.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        MedicationAdminstrations,
      });
    } catch (error) {
      console.error("Get MedicationAdminstrations error:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch MedicationAdminstrations" });
    }
  }

  async getMedicationAdminstrationById(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const MedicationAdminstration =
        await prisma.medicationAdminstration.findFirst({
          where: { id, patientId: patientid },
        });

      if (!MedicationAdminstration) {
        res.status(404).json({ error: "MedicationAdminstration not found" });
        return;
      }

      res.status(200).json({ MedicationAdminstration });
    } catch (error) {
      console.error("Get MedicationAdminstration error:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch MedicationAdminstration" });
    }
  }

  async updateMedicationAdminstration(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { administeredDate, ...rest } = req.body;
      const MedicationAdminstration =
        await prisma.medicationAdminstration.update({
          where: { id },
          data: {
            ...rest,
            administeredDate: new Date(administeredDate),
          },
        });

      res.status(200).json({
        message: "MedicationAdminstration updated successfully",
        MedicationAdminstration,
      });
    } catch (error) {
      console.error("Update MedicationAdminstration error:", error);
      res
        .status(500)
        .json({ error: "Failed to update MedicationAdminstration" });
    }
  }

  async deleteMedicationAdminstration(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const MedicationAdminstration =
        await prisma.medicationAdminstration.findFirst({
          where: { id, patientId: patientid },
        });

      if (!MedicationAdminstration) {
        res.status(404).json({ error: "MedicationAdminstration not found" });
        return;
      }

      await prisma.medicationAdminstration.delete({
        where: { id },
      });

      res.status(200).json({
        message: "MedicationAdminstration deleted successfully",
      });
    } catch (error) {
      console.error("Delete MedicationAdminstration error:", error);
      res
        .status(500)
        .json({ error: "Failed to delete MedicationAdminstration" });
    }
  }
}
