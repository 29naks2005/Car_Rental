import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@driveelite.com" },
    update: {},
    create: {
      email: "admin@driveelite.com",
      passwordHash: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      phone: "9999999999",
    },
  });

  const customerPassword = await bcrypt.hash("customer123", 10);
  const customer = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      passwordHash: customerPassword,
      name: "John Doe",
      role: "CUSTOMER",
      phone: "8888888888",
    },
  });

  const sedan = await prisma.category.upsert({
    where: { name: "Sedan" },
    update: {},
    create: { name: "Sedan", description: "Comfortable 4-door cars for everyday driving" },
  });

  const suv = await prisma.category.upsert({
    where: { name: "SUV" },
    update: {},
    create: { name: "SUV", description: "Spacious sport utility vehicles for families and adventure" },
  });

  const sports = await prisma.category.upsert({
    where: { name: "Sports" },
    update: {},
    create: { name: "Sports", description: "High-performance sports cars for thrill seekers" },
  });

  const luxury = await prisma.category.upsert({
    where: { name: "Luxury" },
    update: {},
    create: { name: "Luxury", description: "Premium luxury vehicles for an elite experience" },
  });

  const vehicles = [
    { categoryId: sedan.id, make: "Toyota", model: "Camry", year: 2024, licensePlate: "DL-01-AB-1234", pricePerDay: 45, imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800" },
    { categoryId: sedan.id, make: "Honda", model: "Civic", year: 2023, licensePlate: "DL-01-CD-5678", pricePerDay: 42, imageUrl: "https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1280.jpg" },
    { categoryId: suv.id, make: "Toyota", model: "Fortuner", year: 2024, licensePlate: "DL-02-EF-9012", pricePerDay: 85, imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800" },
    { categoryId: suv.id, make: "Hyundai", model: "Creta", year: 2024, licensePlate: "DL-02-GH-3456", pricePerDay: 55, imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800" },
    { categoryId: sports.id, make: "Ford", model: "Mustang", year: 2023, licensePlate: "DL-03-IJ-7890", pricePerDay: 150, imageUrl: "https://www.usnews.com/object/image/0000019b-0a66-dbed-adff-0a7612800000/2026-ford-mustang-front-angle-view-ak.jpg?update-time=1765406019919&size=responsiveGallery&format=webp" },
    { categoryId: sports.id, make: "Chevrolet", model: "Corvette", year: 2024, licensePlate: "DL-03-KL-1122", pricePerDay: 200, imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800" },
    { categoryId: luxury.id, make: "BMW", model: "5 Series", year: 2024, licensePlate: "DL-04-MN-3344", pricePerDay: 120, imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800" },
    { categoryId: luxury.id, make: "Mercedes", model: "E-Class", year: 2024, licensePlate: "DL-04-OP-5566", pricePerDay: 130, imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800" },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { licensePlate: v.licensePlate },
      update: {},
      create: v,
    });
  }

  console.log("✅ Seeded:", { admin: admin.email, customer: customer.email, vehicleCount: vehicles.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
