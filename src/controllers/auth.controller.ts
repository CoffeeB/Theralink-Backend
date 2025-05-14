import { Request, Response } from "express";
import prisma from "../config/database";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "../utils/auth.utils";
import { ILoginRequest, ISignupRequest } from "../interfaces/auth.interfaces";
import { EmailService } from "../services/email.service";
import { generateResetToken } from "../utils/auth.utils";
import { signupService } from "../services/auth.service";

export class AuthController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
    // console.log("Email service initialized");
  }

  signup = async (
    req: Request<{}, {}, ISignupRequest>,
    res: Response
  ): Promise<Response> => {
    try {
      const { email, role } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const { user, token, username, password } = await signupService(
        email,
        role,
        prisma,
        true,
        "",
        ""
      );
      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        credentials: {
          username,
          password,
        },
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  };
  login = async (
    req: Request<{}, {}, ILoginRequest>,
    res: Response
  ): Promise<Response> => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: "Login failed" });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const resetToken = generateResetToken();
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpiry },
      });

      await this.emailService.sendPasswordReset(email, resetToken);

      return res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({ error: "Failed to process request" });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() },
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      const hashedPassword = await hashPassword(password);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      // Send confirmation email
      await this.emailService.sendPasswordChangeConfirmation(user.email);

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).json({ error: "Failed to reset password" });
    }
  };
}
