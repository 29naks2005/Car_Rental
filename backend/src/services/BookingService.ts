import { PrismaClient, Booking, BookingStatus } from "@prisma/client";
import { CreateBookingDTO } from "../dtos/BookingDTO";

export class BookingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async bookVehicle(userId: number, dto: CreateBookingDTO): Promise<Booking> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "AVAILABLE") {
      throw new Error("Vehicle is not available for booking");
    }

    const pickup = new Date(dto.pickupDate);
    const dropoff = new Date(dto.dropoffDate);

    if (dropoff <= pickup) {
      throw new Error("Drop-off date must be after pickup date");
    }

    const diffMs = dropoff.getTime() - pickup.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const totalAmount = this.calculateTotal(vehicle.pricePerDay, days);

    const booking = await this.prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId,
          vehicleId: dto.vehicleId,
          pickupDate: pickup,
          dropoffDate: dropoff,
          totalAmount,
          status: "PENDING",
        },
      });

      await tx.vehicle.update({
        where: { id: dto.vehicleId },
        data: { status: "RENTED" },
      });

      return newBooking;
    });

    return booking;
  }

  private calculateTotal(pricePerDay: number, days: number): number {
    return pricePerDay * days;
  }

  public async getUserBookings(userId: number): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { vehicle: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  public async getAllBookings(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      include: {
        vehicle: { include: { category: true } },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  public async changeBookingStatus(id: number, status: BookingStatus): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id },
        data: { status },
      });

      if (status === "COMPLETED" || status === "CANCELLED") {
        await tx.vehicle.update({
          where: { id: booking.vehicleId },
          data: { status: "AVAILABLE" },
        });
      }

      return updated;
    });
  }
}
