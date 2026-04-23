# DriveElite — Intermediate Car Rental Platform (TS/OOP Edition)

DriveElite is a full-stack car rental platform built with **TypeScript** and strong **Object-Oriented Programming (OOP)** principles. It provides a seamless experience for customers to rent vehicles and for admins to manage fleet operations efficiently.

---

## Overview

DriveElite focuses on clean architecture, scalability, and maintainability. The system is designed using **class-based patterns**, strict typing, and modular structure, making it ideal for real-world production-level applications.

---

## Architectural Principles

### Class-Based Architecture
- Controllers and Services are implemented as **TypeScript classes**
- Promotes modular and reusable code

### Dependency Injection
- Services are injected into Controllers via constructors  
- Ensures loose coupling and improves testability

### Encapsulation
- Uses TypeScript access modifiers:
  - `private`
  - `public`
  - `readonly`
- Protects internal logic and enforces structure

### DTOs (Data Transfer Objects)
- All request payloads are validated and typed using interfaces
- Prevents invalid data from entering the system

### Prisma Type Safety
- Database models are mapped directly to TypeScript types
- Ensures **end-to-end type safety**

---

## Features (MVP)

### Authentication
- JWT-based authentication
- Role-based access:
  - Customer
  - Admin

### Vehicle Discovery
- Browse vehicles by category
- View availability and details

### Booking System
- Select rental start and end dates
- Flat-rate pricing per day
- Booking confirmation flow

### Admin Panel
- Manage vehicles (CRUD operations)
- Update booking statuses
- Monitor system usage

---

## Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Frontend     | React.js + TypeScript (`.tsx`)      |
| Backend      | Node.js + Express.js (TypeScript)   |
| Database     | PostgreSQL                          |
| ORM          | Prisma ORM                          |
| Auth         | JWT (JSON Web Tokens)               |

---
