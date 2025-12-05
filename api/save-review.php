<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['author']) || !isset($input['rating']) || !isset($input['text'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$jsonFile = __DIR__ . '/../data/reviews.json';

// Ensure file exists
if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, '[]');
}

// Read existing reviews
$reviews = [];
$jsonContent = file_get_contents($jsonFile);
if (!empty(trim($jsonContent))) {
    $decoded = json_decode($jsonContent, true);
    if (is_array($decoded)) {
        $reviews = $decoded;
    }
}

// Create new review
$nextId = 1;
if (!empty($reviews)) {
    $ids = array_column($reviews, 'id');
    $nextId = max($ids) + 1;
}

$newReview = [
    'id' => $nextId,
    'author' => $input['author'],
    'email' => isset($input['email']) ? $input['email'] : '',
    'rating' => (int)$input['rating'],
    'text' => $input['text'],
    'date' => date('Y-m-d'),
    'verified' => false
];

// Add new review to array
array_unshift($reviews, $newReview);

// Save to file
$jsonOutput = json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($jsonOutput === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to encode JSON: ' . json_last_error_msg()]);
    exit;
}

if (file_put_contents($jsonFile, $jsonOutput) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write to file']);
    exit;
}

http_response_code(201);
echo json_encode([
    'success' => true,
    'message' => 'Review saved successfully',
    'review' => $newReview
]);