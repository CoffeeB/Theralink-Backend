import { Request, Response } from 'express';
import prisma from '../config/database';
import { 
    generateUsername, 
    generatePassword, 
    hashPassword, 
    comparePasswords, 
    generateToken 
} from '../utils/auth.utils';
import { ILoginRequest, ISignupRequest } from '../interfaces/auth.interfaces';

export class AuthController {
    signup = async (req: Request<{}, {}, ISignupRequest>, res: Response): Promise<Response> => {
        try {
            const { email, role } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const username = generateUsername(email);
            const password = generatePassword();
            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    role
                }
            });

            const token = generateToken(user);

            return res.status(201).json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                credentials: {
                    username,
                    password
                },
                token
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    };

    login = async (req: Request<{}, {}, ILoginRequest>, res: Response): Promise<Response> => {
        try {
            const { username, password } = req.body;

            const user = await prisma.user.findUnique({ where: { username } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isValidPassword = await comparePasswords(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = generateToken(user);

            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                token
            });
        } catch (error) {
            return res.status(500).json({ error: 'Login failed' });
        }
    };
}
