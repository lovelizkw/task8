<?php
header('Content-Type: application/json');
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Не авторизован']);
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT id, name, email, phone FROM food_users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

$stmt = $pdo->prepare("SELECT * FROM food_orders WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$user_id]);
$orders = $stmt->fetchAll();

echo json_encode([
    'status' => 'success',
    'user' => $user,
    'orders' => $orders
]);
?>
