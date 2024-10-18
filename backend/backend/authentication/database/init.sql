-- Users Table
CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(50)  NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER   NOT NULL,
    branch_id  INTEGER   NOT NULL,
    date_time  TIMESTAMP NOT NULL,
    status     VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
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
CREATE TABLE IF NOT EXISTS feedback
(
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL,
    feedback_text TEXT    NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
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

-- Patients Table
CREATE TABLE IF NOT EXISTS patients
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    contact_info TEXT         NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles
(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    profile_details TEXT    NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    message    TEXT    NOT NULL,
    status     VARCHAR(50) DEFAULT 'sent',
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);