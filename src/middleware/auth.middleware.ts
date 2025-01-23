import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/auth.interfaces';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
         res.status(401).json({ error: 'Authentication required' });
         return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
        req.user = decoded;
        next();
    } catch (error) {
         res.status(401).json({ error: 'Invalid token' });
         return
    }
};

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction):void => {
        if (!req.user || !roles.includes(req.user.role)) {
             res.status(403).json({ error: 'Unauthorized access' });
             return
        }
        next();
    };
};
