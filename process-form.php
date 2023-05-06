<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $movieTitle = $_POST["movie-request"];
    $email = $_POST["email"];
    
    // Validate the form data
    $errors = array();
    if (empty($movieTitle)) {
        $errors[] = "Movie title is required";
    }
    if (empty($email)) {
        $errors[] = "Email address is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address format";
    }
    
    // If there are no errors, send the email
    if (empty($errors)) {
        $to = "xsanchitguptaa@gmail.com"; // Replace with your email address
        $subject = "Movie Request: " . $movieTitle;
        $message = "A user has requested the following movie: " . $movieTitle . "\n\n";
        $message .= "Email address: " . $email;
        $headers = "From: " . $email;
        
        if (mail($to, $subject, $message, $headers)) {
            echo "Thank you for your request!";
        } else {
            echo "An error occurred while processing your request. Please try again later.";
        }
    } else {
        echo implode("<br>", $errors);
    }
}
?>
