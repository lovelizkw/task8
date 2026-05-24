<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT id, name, password FROM food_users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Авторизация успешна',
        'user' => ['id' => $user['id'], 'name' => $user['name']]
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный email или пароль']);
}
?>
