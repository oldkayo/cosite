<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

session_start();
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
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get input data
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Check for JSON decode errors
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'error' => 'خطأ في تنسيق البيانات: ' . json_last_error_msg()
    ]);
    exit;
}

if (!$input || !isset($input['email']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني وكلمة المرور مطلوبان']);
    exit;
}

$jsonFile = __DIR__ . '/../data/members.json';

if (!file_exists($jsonFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'خطأ في قاعدة البيانات: الملف غير موجود',
        'file_path' => $jsonFile
    ]);
    exit;
}

$jsonContent = file_get_contents($jsonFile);
if ($jsonContent === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'خطأ في قراءة ملف البيانات'
    ]);
    exit;
}

$members = json_decode($jsonContent, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'خطأ في تنسيق ملف البيانات: ' . json_last_error_msg()
    ]);
    exit;
}

if (!is_array($members)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'خطأ في قراءة البيانات: البيانات ليست مصفوفة'
    ]);
    exit;
}

$email = trim($input['email']);
$password = $input['password'];

// Find member by email
$member = null;
foreach ($members as $m) {
    if (strtolower($m['email']) === strtolower($email) && isset($m['active']) && $m['active']) {
        $member = $m;
        break;
    }
}

if (!$member) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة']);
    exit;
}

// Verify password
if (password_verify($password, $member['password'])) {
    // Set session
    $_SESSION['user_id'] = $member['id'];
    $_SESSION['user_email'] = $member['email'];
    $_SESSION['user_name'] = $member['name'];
    $_SESSION['user_role'] = $member['role'];
    $_SESSION['user_permissions'] = $member['permissions'] ?? [];
    $_SESSION['logged_in'] = true;

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'تم تسجيل الدخول بنجاح',
        'user' => [
            'id' => $member['id'],
            'name' => $member['name'],
            'email' => $member['email'],
            'role' => $member['role'],
            'permissions' => $member['permissions'] ?? []
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة']);
}

