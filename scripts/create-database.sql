-- Create database schema for conference registration system

-- Users table for individual registrations
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    nic VARCHAR(20) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    workplace VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    is_cssl_member BOOLEAN DEFAULT FALSE,
    cssl_membership_id VARCHAR(50),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conference packages
CREATE TABLE IF NOT EXISTS packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    days_included INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User registrations
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    package_id INTEGER REFERENCES packages(id),
    original_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    final_price DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_verified_at TIMESTAMP,
    payment_verified_by INTEGER,
    invoice_generated BOOLEAN DEFAULT FALSE,
    invoice_number VARCHAR(100),
    qr_code_generated BOOLEAN DEFAULT FALSE,
    qr_code_data TEXT,
    registration_type VARCHAR(50) DEFAULT 'individual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company employees
CREATE TABLE IF NOT EXISTS company_employees (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    nic VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    designation VARCHAR(255),
    package_id INTEGER REFERENCES packages(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'registered',
    qr_code_generated BOOLEAN DEFAULT FALSE,
    qr_code_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company payments
CREATE TABLE IF NOT EXISTS company_payments (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    total_amount DECIMAL(10,2) NOT NULL,
    employee_count INTEGER NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_verified_at TIMESTAMP,
    payment_verified_by INTEGER,
    invoice_generated BOOLEAN DEFAULT FALSE,
    invoice_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QR code scans for entry tracking
CREATE TABLE IF NOT EXISTS qr_scans (
    id SERIAL PRIMARY KEY,
    qr_code_data TEXT NOT NULL,
    scan_type VARCHAR(50) NOT NULL, -- 'individual' or 'company_employee'
    reference_id INTEGER NOT NULL, -- registration_id or company_employee_id
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scanned_by VARCHAR(255),
    day_number INTEGER NOT NULL, -- 1, 2, or 3
    entry_allowed BOOLEAN DEFAULT TRUE
);

-- Email notifications log
CREATE TABLE IF NOT EXISTS email_notifications (
    id SERIAL PRIMARY KEY,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message_type VARCHAR(50) NOT NULL, -- 'verification', 'invoice', 'qr_code'
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'sent'
);

-- SMS notifications log
CREATE TABLE IF NOT EXISTS sms_notifications (
    id SERIAL PRIMARY KEY,
    recipient_mobile VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(50) NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'sent'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_nic ON users(nic);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_company_employees_company_id ON company_employees(company_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_qr_code_data ON qr_scans(qr_code_data);
CREATE INDEX IF NOT EXISTS idx_qr_scans_reference_id ON qr_scans(reference_id);
