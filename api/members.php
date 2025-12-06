<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check authentication
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'غير مصرح']);
    exit;
}

// Check if user has permission to manage users
if (!in_array('manage_users', $_SESSION['user_permissions'] ?? []) && $_SESSION['user_role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'ليس لديك صلاحية للوصول']);
    exit;
}

$jsonFile = __DIR__ . '/../data/members.json';

// Ensure file exists
if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, '[]');
}

$method = $_SERVER['REQUEST_METHOD'];

// GET - List all members
if ($method === 'GET') {
    $members = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($members)) {
        $members = [];
    }
    
    // Remove passwords from response
    foreach ($members as &$member) {
        unset($member['password']);
    }
    
    echo json_encode(['success' => true, 'members' => $members]);
    exit;
}

// POST - Add new member
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'البيانات المطلوبة غير مكتملة']);
        exit;
    }
    
    $members = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($members)) {
        $members = [];
    }
    
    // Check if email already exists
    foreach ($members as $member) {
        if (strtolower($member['email']) === strtolower(trim($input['email']))) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني مستخدم بالفعل']);
            exit;
        }
    }
    
    // Get next ID
    $nextId = 1;
    if (!empty($members)) {
        $ids = array_column($members, 'id');
        $nextId = max($ids) + 1;
    }
    
    $newMember = [
        'id' => $nextId,
        'name' => trim($input['name']),
        'email' => trim(strtolower($input['email'])),
        'password' => password_hash($input['password'], PASSWORD_DEFAULT),
        'role' => $input['role'] ?? 'member',
        'permissions' => $input['permissions'] ?? [],
        'created_at' => date('Y-m-d'),
        'active' => true
    ];
    
    $members[] = $newMember;
    
    $jsonOutput = json_encode($members, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($jsonFile, $jsonOutput) === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'فشل حفظ البيانات']);
        exit;
    }
    
    unset($newMember['password']);
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'تم إضافة العضو بنجاح', 'member' => $newMember]);
    exit;
}

// PUT - Update member
if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'معرف العضو مطلوب']);
        exit;
    }
    
    $members = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($members)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'خطأ في قراءة البيانات']);
        exit;
    }
    
    $memberIndex = -1;
    foreach ($members as $index => $member) {
        if ($member['id'] == $input['id']) {
            $memberIndex = $index;
            break;
        }
    }
    
    if ($memberIndex === -1) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'العضو غير موجود']);
        exit;
    }
    
    // Check if email is being changed and if it's already used
    if (isset($input['email']) && strtolower($input['email']) !== strtolower($members[$memberIndex]['email'])) {
        foreach ($members as $index => $member) {
            if ($index !== $memberIndex && strtolower($member['email']) === strtolower(trim($input['email']))) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني مستخدم بالفعل']);
                exit;
            }
        }
    }
    
    // Update member
    if (isset($input['name'])) {
        $members[$memberIndex]['name'] = trim($input['name']);
    }
    if (isset($input['email'])) {
        $members[$memberIndex]['email'] = trim(strtolower($input['email']));
    }
    if (isset($input['password']) && !empty($input['password'])) {
        $members[$memberIndex]['password'] = password_hash($input['password'], PASSWORD_DEFAULT);
    }
    if (isset($input['role'])) {
        $members[$memberIndex]['role'] = $input['role'];
    }
    if (isset($input['permissions'])) {
        $members[$memberIndex]['permissions'] = $input['permissions'];
    }
    
    $jsonOutput = json_encode($members, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($jsonFile, $jsonOutput) === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'فشل حفظ البيانات']);
        exit;
    }
    
    $updatedMember = $members[$memberIndex];
    unset($updatedMember['password']);
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'تم تحديث العضو بنجاح', 'member' => $updatedMember]);
    exit;
}

// DELETE - Delete member
if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'معرف العضو مطلوب']);
        exit;
    }
    
    // Prevent deleting yourself
    if ($input['id'] == $_SESSION['user_id']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'لا يمكنك حذف حسابك الخاص']);
        exit;
    }
    
    $members = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($members)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'خطأ في قراءة البيانات']);
        exit;
    }
    
    $memberIndex = -1;
    foreach ($members as $index => $member) {
        if ($member['id'] == $input['id']) {
            $memberIndex = $index;
            break;
        }
    }
    
    if ($memberIndex === -1) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'العضو غير موجود']);
        exit;
    }
    
    // Remove member
    array_splice($members, $memberIndex, 1);
    
    $jsonOutput = json_encode($members, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($jsonFile, $jsonOutput) === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'فشل حفظ البيانات']);
        exit;
    }
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'تم حذف العضو بنجاح']);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);

