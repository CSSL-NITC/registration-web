-- Insert conference packages
INSERT INTO packages (name, code, price, description, days_included) VALUES
('Day 1 - Inauguration', 'DAY1', 20000.00, 'Opening ceremony and keynote speeches', 1),
('Day 1 + Day 2', 'DAY1_2', 35000.00, 'Inauguration + Technical sessions', 2),
('All 3 Days', 'ALL3', 50000.00, 'Complete conference experience', 3);

-- Insert admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@techconf.com', '$2b$10$rQZ8kHWfQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQ', 'admin');

-- Insert sample companies (password: company123)
INSERT INTO companies (name, email, contact_person, phone, address, password_hash, status) VALUES
('Tech Solutions Ltd', 'admin@techsolutions.com', 'John Manager', '0112345678', '123 Tech Street, Colombo', '$2b$10$rQZ8kHWfQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQ', 'active'),
('Digital Innovations', 'hr@digitalinnovations.com', 'Jane HR', '0117654321', '456 Innovation Ave, Kandy', '$2b$10$rQZ8kHWfQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQxwjQ', 'active');

-- Insert sample individual users
INSERT INTO users (name, email, mobile, nic, address, workplace, designation, is_cssl_member, cssl_membership_id, email_verified) VALUES
('Alice Johnson', 'alice@example.com', '0771234567', '123456789V', '789 Main Street, Colombo', 'ABC Company', 'Software Engineer', TRUE, 'CSSL001', TRUE),
('Bob Wilson', 'bob@example.com', '0779876543', '987654321V', '321 Oak Avenue, Galle', 'XYZ Corp', 'Project Manager', FALSE, NULL, TRUE),
('Carol Davis', 'carol@example.com', '0765432109', '456789123V', '654 Pine Road, Kandy', 'Tech Startup', 'Designer', TRUE, 'CSSL002', FALSE);

-- Insert sample registrations
INSERT INTO registrations (user_id, package_id, original_price, discount_percentage, final_price, payment_status, registration_type) VALUES
(1, 3, 50000.00, 20.00, 40000.00, 'verified', 'individual'),
(2, 1, 20000.00, 15.00, 17000.00, 'pending', 'individual'),
(3, 2, 35000.00, 20.00, 28000.00, 'pending', 'individual');

-- Insert sample company employees
INSERT INTO company_employees (company_id, name, email, mobile, nic, address, designation, package_id, amount, status) VALUES
(1, 'David Smith', 'david@techsolutions.com', '0771111111', '111222333V', '111 Employee St, Colombo', 'Developer', 3, 40000.00, 'registered'),
(1, 'Emma Brown', 'emma@techsolutions.com', '0772222222', '222333444V', '222 Worker Ave, Colombo', 'Analyst', 2, 28000.00, 'registered'),
(1, 'Frank Miller', 'frank@techsolutions.com', '0773333333', '333444555V', '333 Staff Rd, Colombo', 'Manager', 3, 40000.00, 'registered'),
(2, 'Grace Lee', 'grace@digitalinnovations.com', '0774444444', '444555666V', '444 Team St, Kandy', 'Designer', 1, 17000.00, 'registered'),
(2, 'Henry Chen', 'henry@digitalinnovations.com', '0775555555', '555666777V', '555 Group Ave, Kandy', 'Developer', 2, 28000.00, 'registered');

-- Insert sample company payments
INSERT INTO company_payments (company_id, total_amount, employee_count, payment_status) VALUES
(1, 108000.00, 3, 'pending'),
(2, 45000.00, 2, 'pending');
