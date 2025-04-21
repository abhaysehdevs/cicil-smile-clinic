<?php
require_once 'db_config.php';

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate phone number
function is_valid_phone($phone) {
    return preg_match('/^[0-9]{10}$/', $phone);
}

// Function to send email notification
function send_email_notification($to, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: Dr. Cicil\'s Smile Clinic <noreply@drcicil.com>' . "\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Function to send WhatsApp notification
function send_whatsapp_notification($phone, $message) {
    // Implement WhatsApp API integration here
    // This is a placeholder for the actual implementation
    return true;
}

// Function to create notification
function create_notification($conn, $type, $reference_id, $message) {
    $stmt = $conn->prepare("INSERT INTO notifications (type, reference_id, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $type, $reference_id, $message);
    return $stmt->execute();
}

// Handle appointment form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['form_type']) && $_POST['form_type'] == 'appointment') {
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $phone = sanitize_input($_POST['phone']);
    $service = sanitize_input($_POST['service']);
    $location = sanitize_input($_POST['location']);
    $date = sanitize_input($_POST['date']);
    $time = sanitize_input($_POST['time']);
    $notes = sanitize_input($_POST['notes']);

    // Insert appointment into database
    $sql = "INSERT INTO appointments (name, email, phone, service, location, appointment_date, appointment_time, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssss", $name, $email, $phone, $service, $location, $date, $time, $notes);
    
    if ($stmt->execute()) {
        $appointment_id = $conn->insert_id;
        
        // Create notification record
        $notification_sql = "INSERT INTO notifications (type, reference_id, message) 
                           VALUES ('appointment', ?, 'New appointment booked')";
        $notification_stmt = $conn->prepare($notification_sql);
        $notification_stmt->bind_param("i", $appointment_id);
        $notification_stmt->execute();

        // Send email notification
        $email_subject = "New Appointment Booking";
        $email_message = "A new appointment has been booked:\n\n";
        $email_message .= "Name: $name\n";
        $email_message .= "Service: $service\n";
        $email_message .= "Date: $date\n";
        $email_message .= "Time: $time\n";
        $email_message .= "Location: $location\n";
        
        send_email_notification($admin_email, $email_subject, $email_message);
        
        // Send WhatsApp notification
        $whatsapp_message = "New appointment booked:\n$name - $service\n$date $time\n$location";
        send_whatsapp_notification($admin_phone, $whatsapp_message);
        
        echo json_encode(['success' => true, 'message' => 'Appointment booked successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error booking appointment']);
    }
    
    $stmt->close();
}

// Handle contact form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['form_type']) && $_POST['form_type'] == 'contact') {
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $phone = sanitize_input($_POST['phone']);
    $message = sanitize_input($_POST['message']);

    // Insert message into database
    $sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $phone, $message);
    
    if ($stmt->execute()) {
        $message_id = $conn->insert_id;
        
        // Create notification record
        $notification_sql = "INSERT INTO notifications (type, reference_id, message) 
                           VALUES ('contact', ?, 'New contact message received')";
        $notification_stmt = $conn->prepare($notification_sql);
        $notification_stmt->bind_param("i", $message_id);
        $notification_stmt->execute();

        // Send email notification
        $email_subject = "New Contact Message";
        $email_message = "A new message has been received:\n\n";
        $email_message .= "From: $name\n";
        $email_message .= "Email: $email\n";
        $email_message .= "Phone: $phone\n";
        $email_message .= "Message: $message\n";
        
        send_email_notification($admin_email, $email_subject, $email_message);
        
        // Send WhatsApp notification
        $whatsapp_message = "New message from $name:\n$message";
        send_whatsapp_notification($admin_phone, $whatsapp_message);
        
        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error sending message']);
    }
    
    $stmt->close();
}

$conn->close();
?> 