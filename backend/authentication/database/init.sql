-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INTEGER REFERENCES Roles(id) DEFAULT 2, -- Default roleId as 2 (e.g., patient)
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_date_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'canceled', 'completed')),
    notes TEXT,
    appointment_type_id INTEGER NOT NULL,
    booking_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (doctor_id) REFERENCES users (id),
    FOREIGN KEY (appointment_type_id) REFERENCES appointment_types (id),
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
);


-- Payments Table
CREATE TABLE IF NOT EXISTS payments
(
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER        NOT NULL,
    amount         DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50)    NOT NULL,
    status         VARCHAR(50) DEFAULT 'completed',
    created_at     TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices
(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER        NOT NULL,
    amount          DECIMAL(10, 2) NOT NULL,
    service_details TEXT           NOT NULL,
    status          VARCHAR(50) DEFAULT 'issued',
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Feedback Table
CREATE TABLE Feedback (
    id SERIAL PRIMARY KEY,
    testimonial TEXT NOT NULL,
    imagePath VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Branches Table
CREATE TABLE IF NOT EXISTS branches
(
    id          SERIAL PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    address     TEXT         NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Profiles Table
CREATE TABLE UserProfiles (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    nationality VARCHAR(255),
    birthday DATE,
    gender VARCHAR(50),
    emergencyContactName VARCHAR(255),
    emergencyContactNumber VARCHAR(50),
    userId INTEGER NOT NULL REFERENCES Users(id),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Notifications Table
CREATE TABLE Notifications (
    notifications_id SERIAL PRIMARY KEY,
    created_by INTEGER NOT NULL REFERENCES Users(id),  -- FK to Users table (user_id)
    notification_type INTEGER NOT NULL REFERENCES Notifications_type(notification_type_id),  -- FK to Notifications_type table
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Notifications_type Table
CREATE TABLE Notifications_type (
    notification_type_id SERIAL PRIMARY KEY,
    notification_name VARCHAR(50) NOT NULL UNIQUE CHECK (notification_name IN ('general', 'invoice', 'charge'))  -- Options: 'general', 'invoice', 'charge'
);

-- Notifications_Users Table
CREATE TABLE Notifications_Users (
    notifications_id INTEGER NOT NULL REFERENCES Notifications(notifications_id),
    recipient INTEGER NOT NULL REFERENCES Users(id),  -- FK to Users table (user_id)
    PRIMARY KEY (notifications_id, recipient)
);

--ImageGalleries table
CREATE TABLE ImageGalleries (
    id SERIAL PRIMARY KEY,
    userProfileId INTEGER NOT NULL REFERENCES UserProfiles(id),  -- FK to UserProfiles table
    beforeImagePath VARCHAR(255) NOT NULL,
    afterImagePath VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Role Table
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO Roles (name, createdAt, updatedAt)
VALUES 
    ('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('patient', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('doctor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;

--Booking tables
CREATE TABLE Bookings (
   id SERIAL PRIMARY KEY,
   userId INTEGER NOT NULL REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
   bookingFor VARCHAR(255) NOT NULL,
   bookingDate TIMESTAMP NOT NULL,
   bookingStatus VARCHAR(255) NOT NULL DEFAULT 'confirmed',
   contactNo VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
