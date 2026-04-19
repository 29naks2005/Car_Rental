erDiagram
    USERS {
        int id PK
        string email UK
        string password_hash
        string name
        string role "CUSTOMER or ADMIN"
        string phone
    }

    CATEGORIES {
        int id PK
        string name UK
        string description
    }

    VEHICLES {
        int id PK
        int category_id FK
        string make
        string model
        int year
        string license_plate UK
        float price_per_day
        string status "AVAILABLE, RENTED, MAINTENANCE"
        string image_url
    }

    BOOKINGS {
        int id PK
        int user_id FK
        int vehicle_id FK
        date pickup_date
        date dropoff_date
        float total_amount
        string status "PENDING, ACTIVE, COMPLETED, CANCELLED"
    }

    %% Relationships
    CATEGORIES ||--|{ VEHICLES : "has"
    USERS ||--o{ BOOKINGS : "makes"
    VEHICLES ||--o{ BOOKINGS : "booked_in"