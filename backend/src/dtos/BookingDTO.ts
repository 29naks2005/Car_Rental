export interface CreateBookingDTO {
  vehicleId: number;
  pickupDate: string;
  dropoffDate: string;
}

export interface UpdateBookingStatusDTO {
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
}
