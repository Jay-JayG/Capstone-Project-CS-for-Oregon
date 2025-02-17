<?php
include_once '../../auth/auth.php'; // Include the secure auth script

// If authentication passed, return a success response
http_response_code(200);
echo json_encode(["status" => "authenticated"]);
?>