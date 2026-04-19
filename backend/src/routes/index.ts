import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { VehicleController } from "../controllers/VehicleController";
import { BookingController } from "../controllers/BookingController";
import { AuthService } from "../services/AuthService";
import { VehicleService } from "../services/VehicleService";
import { BookingService } from "../services/BookingService";
import { authMiddleware, adminMiddleware } from "../middleware/auth";

const router = Router();

const authService = new AuthService();
const vehicleService = new VehicleService();
const bookingService = new BookingService();

const authController = new AuthController(authService);
const vehicleController = new VehicleController(vehicleService);
const bookingController = new BookingController(bookingService);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/vehicles", vehicleController.getAllVehicles);
router.get("/vehicles/:id", vehicleController.getVehicleById);
router.post("/vehicles", authMiddleware, adminMiddleware, vehicleController.createVehicle);

router.post("/bookings", authMiddleware, bookingController.createBooking);
router.get("/bookings/my", authMiddleware, bookingController.getUserBookings);
router.get("/bookings/all", authMiddleware, adminMiddleware, bookingController.getAllBookings);
router.patch("/bookings/:id/status", authMiddleware, adminMiddleware, bookingController.updateBookingStatus);

export default router;
