<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$phone    = trim($data['phone'] ?? '');
$password = $data['password'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Заполните имя, email и пароль']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO food_users (name, email, phone, password) VALUES (?, ?, ?, ?)");
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt->execute([$name, $email, $phone, $hashed]);

    echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно']);
} catch(Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Email уже занят']);
}
?>
