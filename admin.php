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
  <title>Админ-панель - FoodBank</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Личный кабинет</h1>
  <p>Добро пожаловать, <strong><?= htmlspecialchars($_SESSION['user_name']) ?></strong></p>
  
  <h2>Ваши заявки</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>Дата</th>
      <th>Тип</th>
      <th>Гостей</th>
      <th>Сообщение</th>
    </tr>
    <?php
    $stmt = $pdo->prepare("SELECT * FROM food_orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$_SESSION['user_id']]);
    while ($row = $stmt->fetch()) {
      echo "<tr>
        <td>{$row['event_date']}</td>
        <td>{$row['event_type']}</td>
        <td>{$row['guests']}</td>
        <td>{$row['message']}</td>
      </tr>";
    }
    ?>
  </table>

  <a href="index.php">Вернуться на главную</a>
</body>
</html>
