<?php
// Hardcoded credentials (for testing)
$valid_username = 'admin';
$valid_password = 'oregon';

// Check if the Authorization header is set
if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
    // If credentials are not sent, prompt the browser to ask for them
    header('WWW-Authenticate: Basic realm="Restricted Area"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Authentication required.';
    exit; // Stop further execution
}

// Validate the credentials
if ($_SERVER['PHP_AUTH_USER'] === $valid_username && $_SERVER['PHP_AUTH_PW'] === $valid_password) {
    // If credentials are valid, allow access
    echo 'Welcome to the admin area!';
} else {
    // If credentials are invalid, send a 401 response
    header('WWW-Authenticate: Basic realm="Restricted Area"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Invalid credentials.';
    exit;
}
?>