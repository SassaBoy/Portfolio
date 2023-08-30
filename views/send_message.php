<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $inquiry = $_POST["inquiry"];
    $message = $_POST["message"];

    // Set your email address where you want to receive the messages
    $to = "gewersdeon61@gmail.com";

    // Set the email subject
    $subject = "New Contact Message from $name";

    // Compose the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Inquiry: $inquiry\n";
    $body .= "Message:\n$message";

    // Set the headers for the email
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo "Message sent successfully!";
    } else {
        // Failed to send email
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // Invalid request
    echo "Invalid request!";
}
?>
