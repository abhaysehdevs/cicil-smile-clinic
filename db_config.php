<?php
// Database configuration
$db_host = 'localhost';
$db_user = 'your_db_username';
$db_pass = 'your_db_password';
$db_name = 'drcicil_clinic';

// Admin contact details
$admin_email = 'admin@drcicil.com';
$admin_phone = '+1234567890';

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS " . $db_name;
if ($conn->query($sql) === TRUE) {
    // Select the database
    $conn->select_db($db_name);
    
    // Create appointments table
    $sql = "CREATE TABLE IF NOT EXISTS appointments (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        service VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        notes TEXT,
        preferred_contact VARCHAR(20) DEFAULT 'email',
        is_new_patient BOOLEAN DEFAULT TRUE,
        previous_dentist VARCHAR(100),
        medical_conditions TEXT,
        insurance_provider VARCHAR(100),
        insurance_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending'
    )";
    
    if ($conn->query($sql) !== TRUE) {
        echo "Error creating appointments table: " . $conn->error;
    }
    
    // Create contact_messages table
    $sql = "CREATE TABLE IF NOT EXISTS contact_messages (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        preferred_contact VARCHAR(20) DEFAULT 'email',
        urgency ENUM('low', 'normal', 'high') DEFAULT 'normal',
        best_time_to_contact VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('unread', 'read', 'replied') DEFAULT 'unread'
    )";
    
    if ($conn->query($sql) !== TRUE) {
        echo "Error creating contact_messages table: " . $conn->error;
    }
    
    // Create admin_users table
    $sql = "CREATE TABLE IF NOT EXISTS admin_users (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) !== TRUE) {
        echo "Error creating admin_users table: " . $conn->error;
    }
    
    // Insert default admin user if not exists
    $check_admin = "SELECT * FROM admin_users WHERE username = 'admin'";
    $result = $conn->query($check_admin);
    
    if ($result->num_rows == 0) {
        // Default admin credentials - CHANGE THESE!
        $default_username = 'admin';
        $default_password = password_hash('admin123', PASSWORD_DEFAULT); // Change this password!
        $default_email = 'abhaysehdevofficial@gmail.com';
        $default_phone = '919811539510';
        
        $sql = "INSERT INTO admin_users (username, password, email, phone) 
                VALUES ('$default_username', '$default_password', '$default_email', '$default_phone')";
        
        if ($conn->query($sql) !== TRUE) {
            echo "Error creating default admin user: " . $conn->error;
        }
    }
    
} else {
    echo "Error creating database: " . $conn->error;
}

// Function to send email notification
function sendEmailNotification($to, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Dr. Cicil's Smile Clinic <noreply@smileclinic.com>" . "\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Function to send SMS notification (placeholder - implement with your preferred SMS service)
function sendSMSNotification($phone, $message) {
    // Implement SMS sending logic here
    // You can use services like Twilio, Nexmo, etc.
    return true;
}

// Function to send WhatsApp notification (placeholder - implement with your preferred service)
function sendWhatsAppNotification($phone, $message) {
    // Implement WhatsApp sending logic here
    // You can use WhatsApp Business API or other services
    return true;
}

// Function to send notification for new appointment
function notifyNewAppointment($appointment) {
    // Email notification
    $to = "admin@smileclinic.com"; // Replace with your email
    $subject = "New Appointment Booking";
    
    $message = "New appointment booking details:\n\n";
    $message .= "Name: " . $appointment['name'] . "\n";
    $message .= "Email: " . $appointment['email'] . "\n";
    $message .= "Phone: " . $appointment['phone'] . "\n";
    $message .= "Service: " . $appointment['service'] . "\n";
    $message .= "Location: " . $appointment['location'] . "\n";
    $message .= "Date: " . $appointment['date'] . "\n";
    $message .= "Time: " . $appointment['time'] . "\n";
    if (!empty($appointment['notes'])) {
        $message .= "Notes: " . $appointment['notes'] . "\n";
    }
    
    $headers = "From: " . $appointment['email'] . "\r\n";
    $headers .= "Reply-To: " . $appointment['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    mail($to, $subject, $message, $headers);
    
    // You can add additional notification methods here
    // For example, SMS or WhatsApp notifications
}

// Function to send notification for new contact message
function notifyNewContactMessage($message) {
    // Email notification
    $to = "admin@smileclinic.com";
    $subject = "New Contact Message: " . $message['subject'];
    $email_message = "A new message has been received:\n\n";
    $email_message .= "Name: " . $message['name'] . "\n";
    $email_message .= "Email: " . $message['email'] . "\n";
    $email_message .= "Phone: " . $message['phone'] . "\n";
    $email_message .= "Subject: " . $message['subject'] . "\n";
    $email_message .= "Message: " . $message['message'] . "\n";
    $email_message .= "Preferred Contact: " . $message['preferred_contact'] . "\n";
    
    $headers = "From: " . $message['email'] . "\r\n";
    $headers .= "Reply-To: " . $message['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    mail($to, $subject, $email_message, $headers);
    
    // You can add SMS or WhatsApp notification here
}
?> 