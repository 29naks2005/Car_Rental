import { PrismaClient, Vehicle, VehicleStatus } from "@prisma/client";

export class VehicleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAvailableVehicles(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      where: { status: "AVAILABLE" },
      include: { category: true },
    });
  }

  public async getAllVehicles(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      include: { category: true },
    });
  }

  public async getVehicleById(id: number): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  public async createVehicle(data: {
    categoryId: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    pricePerDay: number;
    imageUrl?: string;
  }): Promise<Vehicle> {
    return this.prisma.vehicle.create({ data });
  }

  public async changeStatus(id: number, status: VehicleStatus): Promise<Vehicle> {
    return this.prisma.vehicle.update({
      where: { id },
      data: { status },
    });
  }
}
