import { IUser } from "../interfaces/auth.interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
