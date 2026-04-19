classDiagram
    direction TB

    %% DTOs & Interfaces (TypeScript specific)
    class CreateBookingDTO {
        <<interface>>
        +vehicleId: number
        +pickupDate: Date
        +dropoffDate: Date
    }

    class LoginDTO {
        <<interface>>
        +email: string
        +password: string
    }

    %% Controllers
    class AuthController {
        -authService: AuthService
        +constructor(authService: AuthService)
        +register(req: Request, res: Response): Promise~void~
        +login(req: Request, res: Response): Promise~void~
    }

    class VehicleController {
        -vehicleService: VehicleService
        +constructor(vehicleService: VehicleService)
        +getAllVehicles(req: Request, res: Response): Promise~void~
        +getVehicleById(req: Request, res: Response): Promise~void~
        +createVehicle(req: Request, res: Response): Promise~void~
    }

    class BookingController {
        -bookingService: BookingService
        +constructor(bookingService: BookingService)
        +createBooking(req: Request, res: Response): Promise~void~
        +getUserBookings(req: Request, res: Response): Promise~void~
        +updateBookingStatus(req: Request, res: Response): Promise~void~
    }

    %% Services (Business Logic Encapsulation)
    class AuthService {
        -prisma: PrismaClient
        +constructor()
        +registerUser(data: any): Promise~User~
        +authenticateUser(dto: LoginDTO): Promise~string~
    }

    class VehicleService {
        -prisma: PrismaClient
        +constructor()
        +getAvailableVehicles(): Promise~Vehicle[]~
        +changeStatus(id: number, status: string): Promise~Vehicle~
    }

    class BookingService {
        -prisma: PrismaClient
        +constructor()
        +bookVehicle(userId: number, dto: CreateBookingDTO): Promise~Booking~
        -calculateTotal(pricePerDay: number, days: number): number
        +changeBookingStatus(id: number, status: string): Promise~Booking~
    }

    %% Dependencies via Constructor Injection
    AuthController --> AuthService : injects
    VehicleController --> VehicleService : injects
    BookingController --> BookingService : injects
    
    BookingService ..> CreateBookingDTO : uses
    AuthService ..> LoginDTO : uses