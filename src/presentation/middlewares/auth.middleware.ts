import { Response, Request, NextFunction } from "express";
import { JwtAdapter } from "../../config";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ")[1] || "";

    try {
        
    const payload = await JwtAdapter.verifyToken(token);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
