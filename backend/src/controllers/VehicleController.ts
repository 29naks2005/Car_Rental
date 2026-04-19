import { Request, Response } from "express";
import { VehicleService } from "../services/VehicleService";

export class VehicleController {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    this.vehicleService = vehicleService;
  }

  public getAllVehicles = async (_req: Request, res: Response): Promise<void> => {
    try {
      const vehicles = await this.vehicleService.getAvailableVehicles();
      res.status(200).json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public getVehicleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const vehicle = await this.vehicleService.getVehicleById(id);

      if (!vehicle) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }

      res.status(200).json(vehicle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public createVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicle = await this.vehicleService.createVehicle(req.body);
      res.status(201).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
