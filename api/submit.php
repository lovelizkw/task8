<?php
header('Content-Type: application/json');
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

$name       = trim($data['name'] ?? '');
$phone      = trim($data['phone'] ?? '');
$email      = trim($data['email'] ?? '');
$event_date = $data['date'] ?? '';
$guests     = (int)($data['guests'] ?? 0);
$event_type = $data['event_type'] ?? '';
$message    = trim($data['message'] ?? '');

if (empty($name) || empty($phone) || empty($email) || $guests < 1) {
    echo json_encode(['status' => 'error', 'message' => 'Заполните обязательные поля']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO orders 
        (name, phone, email, event_date, guests, event_type, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([$name, $phone, $email, $event_date, $guests, $event_type, $message]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        'order_id' => $pdo->lastInsertId()
    ]);
} catch(Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при сохранении заявки']);
}
?>