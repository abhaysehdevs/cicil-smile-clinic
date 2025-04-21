<?php
// Include database configuration
require_once 'db_config.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and get form data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $subject = isset($_POST['subject']) ? mysqli_real_escape_string($conn, $_POST['subject']) : 'General Inquiry';
    $preferred_contact = isset($_POST['preferredContactMethod']) ? mysqli_real_escape_string($conn, $_POST['preferredContactMethod']) : 'email';
    
    // Prepare SQL statement
    $sql = "INSERT INTO contact_messages (
        name, email, phone, subject, message, preferred_contact
    ) VALUES (
        '$name', '$email', '$phone', '$subject', '$message', '$preferred_contact'
    )";
    
    // Execute SQL statement
    if ($conn->query($sql) === TRUE) {
        // Get the inserted message data
        $message_id = $conn->insert_id;
        $message_data = [
            'id' => $message_id,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => $subject,
            'message' => $message,
            'preferred_contact' => $preferred_contact
        ];
        
        // Send notification
        notifyNewContactMessage($message_data);
        
        // Return success response
        $response = [
            'status' => 'success',
            'message' => 'Message sent successfully! We will get back to you shortly.'
        ];
    } else {
        // Return error response
        $response = [
            'status' => 'error',
            'message' => 'Error sending message: ' . $conn->error
        ];
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?> 