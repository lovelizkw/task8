<?php 
require_once 'config.php'; 

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Админ-панель — FoodBank</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body { font-family: Montserrat, sans-serif; padding: 20px; background: #f9f9f9; }
    h1, h2 { color: #5F9EA0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
    th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
    th { background: #5F9EA0; color: white; }
    .success { color: green; }
  </style>
</head>
<body>

  <h1>Админ-панель</h1>
  <p>Добро пожаловать, <strong><?= htmlspecialchars($_SESSION['user_name']) ?></strong></p>
  
  <a href="index.php" style="margin-bottom:20px; display:inline-block;">← Вернуться на главную</a>

  <h2>Все заявки от клиентов</h2>
  
  <table>
    <tr>
      <th>ID</th>
      <th>Имя</th>
      <th>Телефон</th>
      <th>Email</th>
      <th>Дата мероприятия</th>
      <th>Гостей</th>
      <th>Тип</th>
      <th>Сообщение</th>
      <th>Дата отправки</th>
    </tr>
    <?php
    $stmt = $pdo->query("SELECT * FROM food_orders ORDER BY created_at DESC");
    while ($row = $stmt->fetch()) {
      echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>{$row['phone']}</td>
        <td>{$row['email']}</td>
        <td>{$row['event_date']}</td>
        <td>{$row['guests']}</td>
        <td>{$row['event_type']}</td>
        <td>" . htmlspecialchars($row['message']) . "</td>
        <td>{$row['created_at']}</td>
      </tr>";
    }
    ?>
  </table>

</body>
</html>
