<?php
// Simple PHP test file
header('Content-Type: application/json; charset=utf-8');

$result = [
    'success' => true,
    'message' => 'PHP يعمل بشكل صحيح!',
    'php_version' => phpversion(),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

