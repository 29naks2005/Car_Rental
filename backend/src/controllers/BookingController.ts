import { Request, Response } from "express";
import { BookingService } from "../services/BookingService";
import { CreateBookingDTO, UpdateBookingStatusDTO } from "../dtos/BookingDTO";

interface AuthRequest extends Request {
  user?: { userId: number; email: string; role: string; name: string };
}

export class BookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  public createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const dto: CreateBookingDTO = req.body;
      const userId = req.user!.userId;

      if (!dto.vehicleId || !dto.pickupDate || !dto.dropoffDate) {
        res.status(400).json({ error: "vehicleId, pickupDate, and dropoffDate are required" });
        return;
      }

      const booking = await this.bookingService.bookVehicle(userId, dto);
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const bookings = await this.bookingService.getUserBookings(userId);
      res.status(200).json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public getAllBookings = async (_req: Request, res: Response): Promise<void> => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  public updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status }: UpdateBookingStatusDTO = req.body;

      if (!status) {
        res.status(400).json({ error: "Status is required" });
        return;
      }

      const booking = await this.bookingService.changeBookingStatus(id, status);
      res.status(200).json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
