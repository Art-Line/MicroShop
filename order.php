<?php
// Сниппет для AjaxForm (&preHooks=`order`)
// Если есть товары, приводим их в подабающий вид
if (isset($_POST['products'])) {
  $arrProducts = json_decode($_POST['products']); # Все товары в обджект
  $count = 0; # Общее количество товаров
  $sum = 0; # Сумма заказа
  $products_html = ''; # хытымэль с таблицей товаров
  $index = 0; # нумерация

  // Начало таблицы с товарами
  $products_html = '
    <table class="table table-striped">
      <thead>
        <tr class="header">
          <th>№</th>
          <th>Наименование</th>
          <th style="text-align:center;">Артикул</th>
          <th style="text-align:center;">Цена</th>
          <th style="text-align:center;">Количество</th>
        </tr>
      </thead>
      <tbody>';

  // Собираем продукты
  foreach ($arrProducts as $arrProduct) {
    $index++;
    $count = (int)$count + (int)$arrProduct->count;
    $sum = (int)$sum + (int)$arrProduct->price * (int)$arrProduct->count;
    $products_html .= '
      <tr>
        <td>'.$index.'</td>
        <td>'.$arrProduct->name.'</td>
        <td style="text-align:center;">'.$arrProduct->art.'</td>
        <td style="text-align:center;">'.$arrProduct->price.' р.</td>
        <td style="text-align:center;">'.$arrProduct->count.' шт.</td>
      </tr>';
  }

  // Итого
  $products_html .= '
    <tr>
      <td colspan="3" style="text-align: right;">Итого:</td>
      <td style="text-align:center;">'.$sum.' р.</td>
      <td style="text-align:center;">'.$count.' шт.</td>
    </tr>';

  // Конец таблицы с товарами
  $products_html .= '
    </tbody>
  </table>';

  // пласеходер для письма
  $modx->setPlaceholder('products_table', $products_html);
  $_POST['products'] = $products_html;
  return true;
}
