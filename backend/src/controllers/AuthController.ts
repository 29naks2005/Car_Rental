import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginDTO, RegisterDTO } from "../dtos/AuthDTO";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: RegisterDTO = req.body;

      if (!dto.email || !dto.password || !dto.name) {
        res.status(400).json({ error: "Email, password, and name are required" });
        return;
      }

      const user = await this.authService.registerUser(dto);

      res.status(201).json({
        message: "User registered successfully",
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: LoginDTO = req.body;

      if (!dto.email || !dto.password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const token = await this.authService.authenticateUser(dto);

      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };
}
