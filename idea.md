# DriveElite — Intermediate Car Rental Platform (TS/OOP Edition)

## Overview
DriveElite is an intermediate-level full-stack car rental platform built with strict Object-Oriented Programming (OOP) principles. It allows customers to browse a vehicle catalog and book rentals, while giving administrators a simple dashboard to manage the fleet.

## Architectural Principles (OOP & TypeScript)
- **Class-Based Architecture:** Controllers and Services are implemented as TypeScript classes.
- **Dependency Injection:** Services are injected into Controllers via constructors to decouple logic and make testing easier.
- **Encapsulation:** Private properties and methods are strictly enforced using TypeScript modifiers (`private`, `public`, `readonly`).
- **Data Transfer Objects (DTOs):** All incoming request bodies are strongly typed using interfaces/DTOs before processing.
- **Prisma Type Safety:** Database models are automatically mapped to TypeScript interfaces for end-to-end type safety.

## Key Features (MVP)
- **Authentication:** JWT-based login (Customer and Admin).
- **Vehicle Discovery:** Browse available vehicles by category.
- **Booking System:** Select dates (Start/End) with flat-rate daily pricing.
- **Admin Panel:** CRUD operations for Vehicles and Booking status management.

## Tech Stack
- **Frontend:** React.js with TypeScript (`.tsx`)
- **Backend:** Node.js with Express.js (Strict TypeScript)
- **Database & ORM:** PostgreSQL + Prisma ORM