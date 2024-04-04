<?php

// Set the response headers to indicate JSON content
header('Content-Type: application/json');

$mysqli = new mysqli('108.167.133.33', 'thvqbfte_WPJJB', 'OSU-Cascades2023', 'thvqbfte_WPJJB');

// Check if the connection was successful
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(array("error" => "Failed to connect to MySQL: " . $mysqli->connect_error));
    exit();
}

$query = "SELECT * FROM test_table";
$result = $mysqli->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode(array("error" => "Error executing query: " . $mysqli->error));
    exit();
}

// Fetch the results and encode them as JSON
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$mysqli->close();

// Send the JSON response
echo json_encode($data);
?>