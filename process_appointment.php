<?php
// Include database configuration
require_once 'db_config.php';

// Set headers for JSON response
header('Content-Type: application/json');

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $service = sanitize_input($_POST['service'] ?? '');
    $location = sanitize_input($_POST['location'] ?? '');
    $date = sanitize_input($_POST['date'] ?? '');
    $time = sanitize_input($_POST['time'] ?? '');
    $notes = sanitize_input($_POST['notes'] ?? '');

    // Validate required fields
    $required_fields = ['name', 'email', 'phone', 'service', 'location', 'date', 'time'];
    $missing_fields = [];

    foreach ($required_fields as $field) {
        if (empty($$field)) {
            $missing_fields[] = $field;
        }
    }

    if (!empty($missing_fields)) {
        echo json_encode([
            'success' => false,
            'message' => 'Missing required fields: ' . implode(', ', $missing_fields)
        ]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        exit;
    }

    // Validate date format
    $date_obj = DateTime::createFromFormat('Y-m-d', $date);
    if (!$date_obj || $date_obj->format('Y-m-d') !== $date) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid date format'
        ]);
        exit;
    }

    // Validate time format
    $time_obj = DateTime::createFromFormat('H:i', $time);
    if (!$time_obj || $time_obj->format('H:i') !== $time) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid time format'
        ]);
        exit;
    }

    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO appointments (name, email, phone, service, location, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Bind parameters
        $stmt->bind_param("ssssssss", $name, $email, $phone, $service, $location, $date, $time, $notes);
        
        // Execute the statement
        if ($stmt->execute()) {
            // Get the ID of the inserted appointment
            $appointment_id = $stmt->insert_id;
            
            // Send notification
            notifyNewAppointment($name, $email, $phone, $service, $location, $date, $time, $notes);
            
            echo json_encode([
                'success' => true,
                'message' => 'Appointment booked successfully',
                'appointment_id' => $appointment_id
            ]);
        } else {
            throw new Exception("Error executing statement: " . $stmt->error);
        }
        
        // Close statement
        $stmt->close();
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error booking appointment: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

// Close connection
$conn->close();
?> 