import { Request, Response } from "express";
import prisma from "../config/database";
import { IStaff } from "../interfaces/staff.interfaces";
import { signupService } from "../services/auth.service";

export class StaffController {
  async createStaff(req: Request<{}, {}, IStaff>, res: Response) {
    try {
      const {
        email,
        dateOfBirth,
        gender,
        phone,
        positionEffectiveDate,
        race,
        ssn,
        ...rest
      } = req.body;
      const [newStaff, _newUser] = await prisma.$transaction(
        async (tx) => {
          const newStaff = await tx.staff.create({
            data: {
              ...rest,
              gender,
              race,
              ssn,
              email,
              phone: phone || undefined,
              dateOfBirth: new Date(dateOfBirth),
              positionEffectiveDate: new Date(positionEffectiveDate),
            },
          });
          const newUser = await signupService(
            email,
            "STAFF",
            tx,
            false,
            newStaff?.firstName,
            newStaff?.lastName
          );

          return [newStaff, newUser];
        },
        { maxWait: 10000, timeout: 15000 }
      );

      return res.status(201).json({
        message: "staff created successfully",
        staff: newStaff,
      });
    } catch (error) {
      console.error("Create staff error:", error);
      return res.status(500).json({ error: "Failed to create staff" });
    }
  }

  async getStaffs(_req: Request, res: Response) {
    try {
      const staffs = await prisma.staff.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ staffs });
    } catch (error) {
      console.error("Get staffs error:", error);
      return res.status(500).json({ error: "Failed to fetch staffs" });
    }
  }

  async getStaffById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const staff = await prisma.staff.findUnique({
        where: { id },
      });

      if (!staff) {
        return res.status(404).json({ error: "staff not found" });
      }

      return res.status(200).json({ staff });
    } catch (error) {
      console.error("Get staff error:", error);
      return res.status(500).json({ error: "Failed to fetch staff" });
    }
  }

  async updateStaff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateOfBirth, ...rest } = req.body;

      const staff = await prisma.staff.update({
        where: { id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "staff updated successfully",
        staff,
      });
    } catch (error) {
      console.error("Update staff error:", error);
      return res.status(500).json({ error: "Failed to update staff" });
    }
  }

  async deleteStaff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.staff.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "staff deleted successfully",
      });
    } catch (error) {
      console.error("Delete staff error:", error);
      return res.status(500).json({ error: "Failed to delete staff" });
    }
  }
}
