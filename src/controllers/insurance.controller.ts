import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomInterface extends ExpressRequest {
  user?:IUser
}

export class InsuranceController {
  async createInsurance(req: CustomInterface, res: Response) {
    try {
      const {patientid} = req.params
   
      const newInsurance = await prisma.insurance.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      return res.status(201).json({
        message: "Insurance created successfully",
        insurance: newInsurance,
      });
    } catch (error) {
      console.error("Create Insurance error:", error);
      return res.status(500).json({ error: "Failed to create Insurance" });
    }
  }

  async getInsurances(req: CustomInterface, res: Response) {
    const {patientid} = req.params
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const insurances = await prisma.insurance.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          patientId: patientid,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.insurance.count({
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
          insurances,
        });
    } catch (error) {
      console.error("Get Insurances error:", error);
      return res.status(500).json({ error: "Failed to fetch Insurances" });
    }
  }

  async getInsuranceById(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const insurance = await prisma.insurance.findUnique({
        where: { id, patientId:patientid },
      });

      if (!insurance) {
        return res.status(404).json({ error: "insurance not found" });
      }

      return res.status(200).json({ insurance });
    } catch (error) {
      console.error("Get Insurance error:", error);
      return res.status(500).json({ error: "Failed to fetch Insurance" });
    }
  }

  async updateInsurance(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const insurance = await prisma.insurance.update({
        where: { id, patientId: patientid },
        data: {
          ...req.body
        },
      });

      return res.status(200).json({
        message: "insurance updated successfully",
        insurance,
      });
    } catch (error) {
      console.error("Update Insurance error:", error);
      return res.status(500).json({ error: "Failed to update Insurance" });
    }
  }

  async deleteInsurance(req: CustomInterface, res: Response) {
    try {
      const { id,patientid } = req.params;
      const insurance = await prisma.insurance.findUnique({
        where: { id, patientId:patientid },
      });

      if (!insurance) {
        return res.status(404).json({ error: "insurance not found" });
      }
      await prisma.insurance.delete({
        where: { id, patientId: patientid },
      });

      return res.status(200).json({
        message: "Insurance deleted successfully",
      });
    } catch (error) {
      console.error("Delete Insurance error:", error);
      return res.status(500).json({ error: "Failed to delete Insurance" });
    }
  }
}
