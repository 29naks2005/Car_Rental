# DriveElite — Premium Car Rental Platform

## Overview

**DriveElite** is a full-stack car rental web application designed for a premium vehicle rental service. It provides customers with an intuitive experience to browse, search, and book cars online — including a curated **luxury fleet** — while empowering business administrators with powerful fleet management, booking tracking, and revenue analytics tools. The platform features real-time vehicle availability, secure authentication, advanced search & filtering, dynamic pricing, and a comprehensive admin dashboard.

Traditional car rental businesses rely on outdated booking systems and phone-based reservations. **DriveElite** modernizes this by offering a seamless digital storefront that integrates vehicle catalog browsing, booking management, secure payments, and rental fulfillment — all backed by role-based access control and real-time data synchronization.

---

## Problem Statement

1. **Outdated reservation systems** — Many car rental businesses still rely on manual phone bookings and spreadsheets, leading to double bookings and lost revenue.
2. **Poor vehicle visibility** — Customers cannot easily browse available vehicles, compare features, or see real-time availability before visiting a rental location.
3. **No luxury segment differentiation** — Premium and luxury vehicles require special handling, insurance options, and pricing that generic platforms don't support.
4. **Manual fleet management** — Tracking vehicle status (available, rented, maintenance, retired) across a fleet is error-prone without automation.
5. **Lack of business insights** — Rental operators have no centralized analytics for revenue, fleet utilization, popular vehicles, or seasonal demand patterns.

---

## Scope

### In Scope
- Customer-facing car rental storefront
- User authentication and authorization (Customer, Admin roles)
- Vehicle catalog with categories (Economy, SUV, Sedan, Luxury, Sports)
- Advanced search and filtering system (price, type, brand, transmission, fuel, seats)
- Real-time vehicle availability calendar
- Booking workflow: select vehicle → choose dates → add extras → confirm
- Dynamic pricing based on duration, season, and vehicle class
- Booking management with status tracking (Pending → Confirmed → Active → Completed)
- Admin dashboard with fleet analytics and revenue insights
- Fleet management (CRUD for vehicles and categories)
- Booking fulfillment workflow
- User profile management with rental history and license verification
- Responsive design for desktop and mobile

### Out of Scope (for Milestone 1)
- Real payment gateway integration (simulated payments only)
- Email/SMS notifications for booking reminders
- Reviews and ratings system
- GPS tracking for rented vehicles
- Multi-location support with inter-branch transfers
- Damage inspection photo upload
- Mobile native application
- Loyalty/rewards program

---

## Key Features

### 🚗 Customer Features

#### 1. Authentication & User Management
- **Registration**: Create account with email, password, phone, and driver's license number.
- **Login/Logout**: Secure JWT-based authentication.
- **Profile Management**: Update personal info, license details, and default payment preferences.
- **Password Management**: Change password with validation.
- **License Verification**: Upload and verify driving license for rental eligibility.

#### 2. Vehicle Discovery
- **Browse Fleet**: View all available vehicles with pagination.
- **Category Filtering**: Filter by vehicle type (Economy, Sedan, SUV, Luxury, Sports).
- **Search**: Full-text search by make, model, or year.
- **Advanced Filtering**: Filter by price range, transmission (Auto/Manual), fuel type, seats, brand.
- **Vehicle Details**: View detailed info (specs, features, pricing, images, availability calendar).
- **Sort Options**: Sort by price (low-high, high-low), newest additions, popularity.
- **Luxury Showcase**: Dedicated luxury section with premium vehicles (Ferrari, Lamborghini, Rolls-Royce, etc.).

#### 3. Booking System
- **Date Selection**: Pick-up and drop-off date/time with availability check.
- **Duration Calculator**: Automatic rental duration and price calculation.
- **Add-Ons**: Select optional extras (GPS, child seat, insurance upgrade, additional driver).
- **Price Breakdown**: Transparent pricing with base rate, add-ons, taxes, and total.
- **Booking Confirmation**: Receive booking ID, vehicle details, and rental summary.
- **Persistent Selection**: Vehicle selection persists across sessions.

#### 4. Rental Management & Orders
- **Booking History**: View all past and current bookings.
- **Booking Tracking**: Check real-time status of active bookings (Pending → Confirmed → Active → Completed).
- **Booking Details**: View complete breakdown of each rental.
- **Cancel Booking**: Cancel bookings before pickup time (with cancellation policy).
- **Extend Rental**: Request rental extension from active booking page.

### 👔 Admin Features

#### 5. Dashboard & Analytics
- **Revenue Overview**: Total revenue, total bookings, active rentals, fleet utilization rate.
- **Recent Bookings**: Quick view of latest customer bookings.
- **Fleet Status**: Overview of vehicle availability (Available, Rented, Maintenance, Retired).
- **Popular Vehicles**: Analytics on most-booked cars.
- **Revenue Trends**: Monthly/weekly rental revenue charts.
- **Luxury Segment Metrics**: Dedicated analytics for premium fleet performance.

#### 6. Fleet Management
- **Vehicle CRUD**: Create, read, update, delete vehicles.
- **Vehicle Status Management**: Update status (Available, Rented, Under Maintenance, Retired).
- **Category Management**: Create and manage vehicle categories/types.
- **Image Upload**: Upload and manage vehicle gallery images.
- **Pricing Configuration**: Set daily/weekly/monthly rates with luxury surcharges.
- **Maintenance Scheduling**: Track and schedule vehicle maintenance windows.

#### 7. Booking Management
- **Booking Dashboard**: View all customer bookings with filters.
- **Booking Details**: Access complete booking information.
- **Status Updates**: Update booking status (Pending → Confirmed → Active → Completed → Cancelled).
- **Booking Search**: Search bookings by ID, customer name, vehicle, or date.
- **Late Returns**: Flag and manage overdue rentals.
- **Damage Reports**: Log damage reports upon vehicle return.

---

## Tech Stack

| Layer          | Technology                                      |
|----------------|--------------------------------------------------|
| **Frontend**   | React.js, Redux (state management), Axios       |
| **Backend**    | Node.js (Express.js), TypeScript                 |
| **Database**   | PostgreSQL (relational data)                     |
| **Auth**       | JWT (JSON Web Tokens) + bcrypt (password hash)   |
| **API**        | RESTful API design                               |
| **Testing**    | Jest, React Testing Library, Supertest           |
| **DevOps**     | Docker, GitHub Actions (CI/CD)                   |
| **Storage**    | Local file system / Cloud storage (images)       |

---

## Architecture Principles

- **Clean Architecture**: Controllers → Services → Repositories separation
- **OOP Principles**: Encapsulation, Abstraction, Inheritance, Polymorphism
- **Design Patterns** (applied where appropriate):
  - **Strategy** — Different pricing strategies (daily, weekly, luxury, seasonal)
  - **Observer** — Booking status change notifications
  - **Factory** — Creating different vehicle types, user roles
  - **Repository** — Data access abstraction
  - **Singleton** — Database connection pool
  - **Decorator** — Adding extras to bookings (GPS, insurance, child seat)
  - **Chain of Responsibility** — Booking validation pipeline
  - **State** — Booking lifecycle management
- **SOLID Principles** adherence
- **RESTful API** best practices
- **DTO Pattern** for data transfer between layers

---

## User Roles

| Role          | Description                                                        |
|---------------|--------------------------------------------------------------------|
| **Customer**  | Can browse, search, book vehicles, view rental history, manage profile. |
| **Admin**     | Full access to fleet, bookings, analytics, pricing, and settings.  |

---

## Entity Relationships Overview

- **Users** can place multiple **Bookings**
- **Bookings** can have multiple **BookingExtras** (add-ons like GPS, insurance)
- **Vehicles** belong to **Categories** (Economy, SUV, Sedan, Luxury, Sports)
- **Bookings** reference a **Vehicle** for a specific date range
- **Vehicles** have **VehicleImages** for a gallery view
- **DamageReports** are linked to **Bookings** and **Vehicles**
