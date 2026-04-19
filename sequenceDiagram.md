sequenceDiagram
    actor C as Customer
    actor A as Admin
    participant FE as React (TS)
    participant Ctrl as BookingController
    participant Svc as BookingService
    participant DB as PrismaClient

    Note over C, DB: Customer places a booking
    C ->> FE: Selects vehicle & dates
    FE ->> Ctrl: POST /api/bookings (CreateBookingDTO)
    
    Ctrl ->> Ctrl: Validate Req Body against DTO
    Ctrl ->> Svc: bookVehicle(userId, CreateBookingDTO)
    
    Svc ->> DB: vehicle.findUnique({ id: dto.vehicleId })
    DB -->> Svc: Vehicle Data (to check availability & price)
    
    Svc ->> Svc: calculateTotal()
    
    Svc ->> DB: $transaction (create booking + update vehicle status)
    DB -->> Svc: Booking created
    
    Svc -->> Ctrl: returns Booking object
    Ctrl -->> FE: 201 Created (JSON)
    FE -->> C: "Booking Confirmed"

    Note over A, DB: Admin updates status
    A ->> FE: Marks booking COMPLETED
    FE ->> Ctrl: PATCH /api/bookings/:id/status
    Ctrl ->> Svc: changeBookingStatus(id, 'COMPLETED')
    Svc ->> DB: booking.update({ status: 'COMPLETED' })
    Svc ->> DB: vehicle.update({ status: 'AVAILABLE' })
    DB -->> Svc: Updated records
    Svc -->> Ctrl: Success
    Ctrl -->> FE: 200 OK