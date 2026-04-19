graph TB
    subgraph DriveElite MVP (TS/OOP)
        UC1["Register / Login (JWT)"]
        UC2["Browse Vehicles"]
        UC3["Place Booking"]
        UC4["View My Bookings"]
        
        UC5["Manage Vehicles (CRUD)"]
        UC6["Update Booking Status"]
        UC7["View All Bookings"]
    end

    Customer((Customer))
    Admin((Admin))

    %% Customer
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4

    %% Admin
    Admin --> UC1
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7