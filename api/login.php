<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT id, name, email FROM food_users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];

    echo json_encode([
        'status' => 'success',
        'message' => 'Вход выполнен успешно',
        'user' => $user
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный email или пароль']);
}
?>
