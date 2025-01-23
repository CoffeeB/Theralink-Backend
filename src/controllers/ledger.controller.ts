import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class LedgerController {
  async createLedger(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ledgerDate, ...rest } = req.body;
      const newLedger = await prisma.ledger.create({
        data: {
          ...rest,
          ledgerDate: new Date(ledgerDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Ledger created successfully",
        ledger: newLedger,
      });
    } catch (error) {
      console.error("Create Ledger error:", error);
      res.status(500).json({ error: "Failed to create Ledger" });
    }
  }

  async getLedgers(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Ledger = await prisma.ledger.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.ledger.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Ledger,
      });
    } catch (error) {
      console.error("Get Ledgers error:", error);
      res.status(500).json({ error: "Failed to fetch Ledgers" });
    }
  }

  async getLedgerById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Ledger = await prisma.ledger.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Ledger) {
        res.status(404).json({ error: "Ledger not found" });
        return;
      }

      res.status(200).json({ Ledger });
    } catch (error) {
      console.error("Get Ledger error:", error);
      res.status(500).json({ error: "Failed to fetch Ledger" });
    }
  }

  async updateLedger(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ledgerDate, ...rest } = req.body;

      const ledger = await prisma.ledger.update({
        where: { id },
        data: {
          ...rest,
          ledgerDate: new Date(ledgerDate),
        },
      });

      res.status(200).json({
        message: "ledger updated successfully",
        ledger,
      });
    } catch (error) {
      console.error("Update Ledger error:", error);
      res.status(500).json({ error: "Failed to update Ledger" });
    }
  }

  async deleteLedger(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Ledger = await prisma.ledger.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Ledger) {
        res.status(404).json({ error: "Ledger not found" });
        return;
      }

      await prisma.ledger.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Ledger deleted successfully",
      });
    } catch (error) {
      console.error("Delete Ledger error:", error);
      res.status(500).json({ error: "Failed to delete Ledger" });
    }
  }
}
