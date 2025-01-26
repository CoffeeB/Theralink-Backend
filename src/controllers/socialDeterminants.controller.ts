import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class SocialDeterminantsController {
  async createSocialDeterminants(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newSocialDeterminants = await prisma.socialDeterminants.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Social Determinants created successfully",
        SocialDeterminants: newSocialDeterminants,
      });
    } catch (error) {
      console.error("Create SocialDeterminants error:", error);
      res.status(500).json({ error: "Failed to create SocialDeterminants" });
    }
  }

  async getSocialDeterminants(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const SocialDeterminants = await prisma.socialDeterminants.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.socialDeterminants.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        SocialDeterminants,
      });
    } catch (error) {
      console.error("Get SocialDeterminantss error:", error);
      res.status(500).json({ error: "Failed to fetch SocialDeterminantss" });
    }
  }

  async getSocialDeterminantsById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const SocialDeterminants = await prisma.socialDeterminants.findFirst({
        where: { id, patientId: patientid },
      });

      if (!SocialDeterminants) {
        res.status(404).json({ error: "SocialDeterminants not found" });
        return;
      }

      res.status(200).json({ SocialDeterminants });
    } catch (error) {
      console.error("Get SocialDeterminants error:", error);
      res.status(500).json({ error: "Failed to fetch SocialDeterminants" });
    }
  }

  async updateSocialDeterminants(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const SocialDeterminants = await prisma.socialDeterminants.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "Social Determinants updated successfully",
        SocialDeterminants,
      });
    } catch (error) {
      console.error("Update SocialDeterminants error:", error);
      res.status(500).json({ error: "Failed to update SocialDeterminants" });
    }
  }

  async deleteSocialDeterminants(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const SocialDeterminants = await prisma.socialDeterminants.findFirst({
        where: { id, patientId: patientid },
      });

      if (!SocialDeterminants) {
        res.status(404).json({ error: "SocialDeterminants not found" });
        return;
      }

      await prisma.socialDeterminants.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Social Determinants deleted successfully",
      });
    } catch (error) {
      console.error("Delete SocialDeterminants error:", error);
      res.status(500).json({ error: "Failed to delete SocialDeterminants" });
    }
  }
}
