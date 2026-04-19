export interface User {
  id: number;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
  phone?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Vehicle {
  id: number;
  categoryId: number;
  category?: Category;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  pricePerDay: number;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  imageUrl?: string;
}

export interface Booking {
  id: number;
  userId: number;
  vehicleId: number;
  pickupDate: string;
  dropoffDate: string;
  totalAmount: number;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  vehicle?: Vehicle;
  user?: User;
}

export interface DecodedToken {
  userId: number;
  email: string;
  role: string;
  name: string;
}
